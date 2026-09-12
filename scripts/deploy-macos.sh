#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This deploy script is intended for macOS only." >&2
  exit 1
fi

SERVER_USER="${SERVER_USER:-root}"
SERVER_HOST="${SERVER_HOST:-13.143.244.250}"
SERVER_PORT="${SERVER_PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/opt/nehold-creator}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/nehold_creator}"
RESTART_CONTAINER="${RESTART_CONTAINER:-1}"
FORCE_RESTART="${FORCE_RESTART:-0}"
SSH_TARGET="${SERVER_USER}@${SERVER_HOST}"
REMOTE_MANIFEST=".deploy-manifest"
SSH_ARGS=(-n -p "$SERVER_PORT")
SCP_ARGS=(-P "$SERVER_PORT")

if [[ -f "$SSH_KEY" ]]; then
  SSH_ARGS+=(-i "$SSH_KEY")
  SCP_ARGS+=(-i "$SSH_KEY")
fi

REQUIRED_PATHS=(
  "dist"
  "server"
  "Dockerfile"
  "compose.yaml"
)

run_build() {
  if command -v npm.cmd >/dev/null 2>&1; then
    npm.cmd run build
  else
    npm run build
  fi
}

require_path() {
  local path="$1"

  if [[ ! -e "$path" ]]; then
    echo "Missing required path: $path" >&2
    exit 1
  fi
}

hash_file() {
  local path="$1"

  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$path" | awk '{print $1}'
  elif command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$path" | awk '{print $1}'
  else
    echo "sha256sum or shasum is required for incremental deploy." >&2
    exit 1
  fi
}

generate_manifest() {
  local manifest_path="$1"

  : > "$manifest_path"

  for path in "${REQUIRED_PATHS[@]}"; do
    if [[ -d "$path" ]]; then
      while IFS= read -r -d "" file; do
        printf "%s  %s\n" "$(hash_file "$file")" "$file" >> "$manifest_path"
      done < <(find "$path" -type f -print0)
    else
      printf "%s  %s\n" "$(hash_file "$path")" "$path" >> "$manifest_path"
    fi
  done

  sort -k2 "$manifest_path" -o "$manifest_path"
}

remote_shell_quote() {
  printf "%q" "$1"
}

echo "Building project..."
run_build

echo "Checking deploy files..."
for path in "${REQUIRED_PATHS[@]}"; do
  require_path "$path"
done

echo "Preparing remote directory: ${SSH_TARGET}:${REMOTE_DIR}"
ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "mkdir -p '$REMOTE_DIR'"

echo "Checking server environment file..."
ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "test -f '$REMOTE_DIR/.env.local'" || {
  echo "Missing server environment file: $REMOTE_DIR/.env.local" >&2
  exit 1
}

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

local_manifest="$tmp_dir/local-manifest"
remote_manifest="$tmp_dir/remote-manifest"

echo "Generating local deploy manifest..."
generate_manifest "$local_manifest"

echo "Reading remote deploy manifest..."
ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "cat '$(remote_shell_quote "$REMOTE_DIR")/$REMOTE_MANIFEST' 2>/dev/null || true" > "$remote_manifest"

changed_list="$tmp_dir/changed-files"
removed_list="$tmp_dir/removed-files"

awk '
  function split_line(line, values) {
    separator = index(line, "  ")
    values["hash"] = substr(line, 1, separator - 1)
    values["path"] = substr(line, separator + 2)
  }
  FILENAME == ARGV[1] { split_line($0, item); remote[item["path"]] = item["hash"]; next }
  { split_line($0, item); if (!(item["path"] in remote) || remote[item["path"]] != item["hash"]) print item["path"] }
' "$remote_manifest" "$local_manifest" > "$changed_list"

awk '
  function get_path(line) { return substr(line, index(line, "  ") + 2) }
  FILENAME == ARGV[1] { local[get_path($0)] = 1; next }
  { path = get_path($0); if (path != ".env.local" && !(path in local)) print path }
' "$local_manifest" "$remote_manifest" > "$removed_list"

changed_count="$(wc -l < "$changed_list" | tr -d ' ')"
removed_count="$(wc -l < "$removed_list" | tr -d ' ')"

if (( removed_count > 0 )); then
  echo "Removing ${removed_count} stale remote file(s)..."

  while IFS= read -r path; do
    ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "cd '$(remote_shell_quote "$REMOTE_DIR")' && rm -f -- '$(remote_shell_quote "$path")'"
  done < "$removed_list"
fi

if (( changed_count > 0 )); then
  echo "Uploading ${changed_count} changed file(s)..."

  while IFS= read -r path; do
    remote_parent="$(dirname "$path")"
    ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "mkdir -p '$(remote_shell_quote "$REMOTE_DIR/$remote_parent")'"
    scp "${SCP_ARGS[@]}" "$path" "$SSH_TARGET:$REMOTE_DIR/$remote_parent/"
  done < "$changed_list"

  echo "Verifying uploaded files..."
  scp "${SCP_ARGS[@]}" "$local_manifest" "$SSH_TARGET:$REMOTE_DIR/$REMOTE_MANIFEST.pending"
  ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "cd '$REMOTE_DIR' && sha256sum -c '$REMOTE_MANIFEST.pending' >/dev/null && mv '$REMOTE_MANIFEST.pending' '$REMOTE_MANIFEST'"
else
  echo "No changed files to upload."
fi

if (( changed_count > 0 || removed_count > 0 )); then
  echo "Deploy sync complete."
else
  echo "Deploy files are already up to date."
fi

if [[ "$RESTART_CONTAINER" == "1" && ( "$changed_count" -gt 0 || "$removed_count" -gt 0 || "$FORCE_RESTART" == "1" ) ]]; then
  echo "Rebuilding and restarting Docker container..."
  ssh "${SSH_ARGS[@]}" "$SSH_TARGET" "cd '$REMOTE_DIR' && docker compose up -d --build"
elif [[ "$RESTART_CONTAINER" == "1" ]]; then
  echo "Container restart skipped because there were no deploy changes."
else
  echo "Container restart skipped because RESTART_CONTAINER=0."
fi
