#!/usr/bin/env bash
set -Eeuo pipefail

SERVER_USER="${SERVER_USER:-root}"
SERVER_HOST="${SERVER_HOST:-5.45.122.81}"
SERVER_PORT="${SERVER_PORT:-22}"
REMOTE_DIR="${REMOTE_DIR:-/root/public_html}"
RESTART_CONTAINER="${RESTART_CONTAINER:-1}"
FORCE_RESTART="${FORCE_RESTART:-0}"
SSH_TARGET="${SERVER_USER}@${SERVER_HOST}"
REMOTE_MANIFEST=".deploy-manifest"

REQUIRED_PATHS=(
  "dist"
  "server"
  "Dockerfile"
  "compose.yaml"
  ".env.local"
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

load_manifest() {
  local manifest_path="$1"
  local array_name="$2"

  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" ]] && continue

    local hash="${line%%  *}"
    local path="${line#*  }"

    eval "$array_name[\"\$path\"]=\"\$hash\""
  done < "$manifest_path"
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
ssh -p "$SERVER_PORT" "$SSH_TARGET" "mkdir -p '$REMOTE_DIR'"

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

local_manifest="$tmp_dir/local-manifest"
remote_manifest="$tmp_dir/remote-manifest"

echo "Generating local deploy manifest..."
generate_manifest "$local_manifest"

echo "Reading remote deploy manifest..."
ssh -p "$SERVER_PORT" "$SSH_TARGET" "cat '$(remote_shell_quote "$REMOTE_DIR")/$REMOTE_MANIFEST' 2>/dev/null || true" > "$remote_manifest"

declare -A local_hashes=()
declare -A remote_hashes=()
load_manifest "$local_manifest" local_hashes
load_manifest "$remote_manifest" remote_hashes

changed_files=()
removed_files=()

for path in "${!local_hashes[@]}"; do
  if [[ "${remote_hashes[$path]:-}" != "${local_hashes[$path]}" ]]; then
    changed_files+=("$path")
  fi
done

for path in "${!remote_hashes[@]}"; do
  if [[ -z "${local_hashes[$path]:-}" ]]; then
    removed_files+=("$path")
  fi
done

if (( ${#removed_files[@]} > 0 )); then
  echo "Removing ${#removed_files[@]} stale remote file(s)..."

  for path in "${removed_files[@]}"; do
    ssh -p "$SERVER_PORT" "$SSH_TARGET" "cd '$(remote_shell_quote "$REMOTE_DIR")' && rm -f -- '$(remote_shell_quote "$path")'"
  done
fi

if (( ${#changed_files[@]} > 0 )); then
  echo "Uploading ${#changed_files[@]} changed file(s)..."

  for path in "${changed_files[@]}"; do
    remote_parent="$(dirname "$path")"
    ssh -p "$SERVER_PORT" "$SSH_TARGET" "mkdir -p '$(remote_shell_quote "$REMOTE_DIR/$remote_parent")'"
    scp -P "$SERVER_PORT" "$path" "$SSH_TARGET:$REMOTE_DIR/$path"
  done

  scp -P "$SERVER_PORT" "$local_manifest" "$SSH_TARGET:$REMOTE_DIR/$REMOTE_MANIFEST"
else
  echo "No changed files to upload."
fi

if (( ${#changed_files[@]} > 0 || ${#removed_files[@]} > 0 )); then
  echo "Deploy sync complete."
else
  echo "Deploy files are already up to date."
fi

if [[ "$RESTART_CONTAINER" == "1" && ( ${#changed_files[@]} > 0 || ${#removed_files[@]} > 0 || "$FORCE_RESTART" == "1" ) ]]; then
  echo "Rebuilding and restarting Docker container..."
  ssh -p "$SERVER_PORT" "$SSH_TARGET" "cd '$REMOTE_DIR' && docker compose up -d --build"
elif [[ "$RESTART_CONTAINER" == "1" ]]; then
  echo "Container restart skipped because there were no deploy changes."
else
  echo "Container restart skipped because RESTART_CONTAINER=0."
fi
