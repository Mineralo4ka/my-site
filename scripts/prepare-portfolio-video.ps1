[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$InputPath,

  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[A-Za-z0-9][A-Za-z0-9_-]*$')]
  [string]$Name,

  [string]$CoverImage,
  [double]$CoverTime = -1,
  [double]$PreviewStart = 1,
  [double]$PreviewDuration = 2.5,
  [ValidateRange(18, 32)]
  [int]$Crf = 25,
  [switch]$AnalyzeOnly,
  [switch]$Force
)

$ErrorActionPreference = 'Stop'

function Find-MediaTool {
  param(
    [Parameter(Mandatory = $true)]
    [string]$ToolName
  )

  $environmentName = "PORTFOLIO_$($ToolName.ToUpperInvariant())_PATH"
  $explicitPath = [Environment]::GetEnvironmentVariable($environmentName)
  if ($explicitPath -and (Test-Path -LiteralPath $explicitPath -PathType Leaf)) {
    return (Resolve-Path -LiteralPath $explicitPath).Path
  }

  $command = Get-Command "$ToolName.exe" -ErrorAction SilentlyContinue
  if ($command) {
    return $command.Source
  }

  $wingetRoot = Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages'
  $candidate = Get-ChildItem -Path (Join-Path $wingetRoot 'Gyan.FFmpeg_*\ffmpeg-*\bin') -Filter "$ToolName.exe" -File -ErrorAction SilentlyContinue |
    Sort-Object FullName -Descending |
    Select-Object -First 1

  if ($candidate) {
    return $candidate.FullName
  }

  throw "$ToolName was not found. Put it on PATH or set $environmentName."
}

function Get-EvenNumber {
  param([double]$Value)
  $rounded = [Math]::Max(2, [Math]::Round($Value))
  return [int]($rounded - ($rounded % 2))
}

$source = (Resolve-Path -LiteralPath $InputPath).Path
$ffprobe = Find-MediaTool -ToolName 'ffprobe'
$probeJson = & $ffprobe -v error -show_streams -show_format -of json -- $source
if ($LASTEXITCODE -ne 0) {
  throw "ffprobe could not inspect $source"
}

$probe = $probeJson | ConvertFrom-Json
$videoStream = $probe.streams | Where-Object codec_type -eq 'video' | Select-Object -First 1
$audioStream = $probe.streams | Where-Object codec_type -eq 'audio' | Select-Object -First 1
if (-not $videoStream) {
  throw 'The input has no video stream.'
}

$duration = [double]$probe.format.duration
$sourceSize = [long]$probe.format.size
$orientation = if ([int]$videoStream.height -gt [int]$videoStream.width) { 'vertical' } else { 'horizontal' }
$summary = [pscustomobject]@{
  Input = $source
  SizeMB = [Math]::Round($sourceSize / 1MB, 2)
  DurationSeconds = [Math]::Round($duration, 2)
  Dimensions = "$($videoStream.width)x$($videoStream.height)"
  Orientation = $orientation
  VideoCodec = $videoStream.codec_name
  PixelFormat = $videoStream.pix_fmt
  FrameRate = $videoStream.avg_frame_rate
  AudioCodec = if ($audioStream) { $audioStream.codec_name } else { 'none' }
}
$summary | Format-List

if ($AnalyzeOnly) {
  return
}

if ($CoverImage -and $CoverTime -ge 0) {
  throw 'Use either -CoverImage or -CoverTime, not both.'
}
if (-not $CoverImage -and $CoverTime -lt 0) {
  throw 'Choose the cover first, then pass -CoverImage or -CoverTime.'
}
if ($PreviewStart -lt 0 -or $PreviewStart -ge $duration) {
  throw "PreviewStart must be between 0 and $duration seconds."
}
if ($CoverTime -ge $duration) {
  throw "CoverTime must be before $duration seconds."
}

$ffmpeg = Find-MediaTool -ToolName 'ffmpeg'
$repoRoot = Split-Path -Parent $PSScriptRoot
$videoDirectory = Join-Path $repoRoot 'public\videos'
$coverDirectory = Join-Path $repoRoot 'public\images\covers'
$videoOutput = Join-Path $videoDirectory "$Name.mp4"
$coverOutput = Join-Path $coverDirectory "$Name.webp"
$hoverOutput = Join-Path $coverDirectory "$Name-hover.webp"
$outputs = @($videoOutput, $coverOutput, $hoverOutput)

foreach ($output in $outputs) {
  if ((Test-Path -LiteralPath $output) -and -not $Force) {
    throw "Output already exists: $output. Use -Force only for an intended replacement."
  }
}

$sourceWidth = [int]$videoStream.width
$sourceHeight = [int]$videoStream.height
$frameRateParts = [string]$videoStream.avg_frame_rate -split '/'
$sourceFrameRate = if ($frameRateParts.Count -eq 2 -and [double]$frameRateParts[1] -ne 0) {
  [double]$frameRateParts[0] / [double]$frameRateParts[1]
} else {
  [double]$videoStream.avg_frame_rate
}
$outputFrameRate = [Math]::Min(30, $sourceFrameRate)
$outputFrameRateText = [Math]::Round($outputFrameRate, 3).ToString([Globalization.CultureInfo]::InvariantCulture)
if ($orientation -eq 'vertical' -and $sourceHeight -gt 1920) {
  $outputHeight = 1920
  $outputWidth = Get-EvenNumber ($sourceWidth * $outputHeight / $sourceHeight)
} elseif ($orientation -eq 'horizontal' -and $sourceWidth -gt 1920) {
  $outputWidth = 1920
  $outputHeight = Get-EvenNumber ($sourceHeight * $outputWidth / $sourceWidth)
} else {
  $outputWidth = Get-EvenNumber $sourceWidth
  $outputHeight = Get-EvenNumber $sourceHeight
}

$temporaryVideo = Join-Path $videoDirectory ".$Name-$([guid]::NewGuid().ToString('N')).tmp.mp4"
$temporaryCover = Join-Path $coverDirectory ".$Name-$([guid]::NewGuid().ToString('N')).tmp.webp"
$temporaryHover = Join-Path $coverDirectory ".$Name-hover-$([guid]::NewGuid().ToString('N')).tmp.webp"
try {
  $videoArguments = @(
    '-hide_banner', '-y', '-i', $source,
    '-map', '0:v:0', '-map', '0:a:0?',
    '-vf', "scale=$outputWidth`:$outputHeight`:flags=lanczos,fps=$outputFrameRateText",
    '-c:v', 'libx264', '-preset', 'medium', '-crf', $Crf, '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
    $temporaryVideo
  )
  & $ffmpeg @videoArguments
  if ($LASTEXITCODE -ne 0) { throw 'Video optimization failed.' }

  if ($CoverImage) {
    $resolvedCover = (Resolve-Path -LiteralPath $CoverImage).Path
    $coverArguments = @(
      '-hide_banner', '-y', '-i', $resolvedCover,
      '-vf', "scale=$outputWidth`:$outputHeight`:force_original_aspect_ratio=increase`:flags=lanczos,crop=$outputWidth`:$outputHeight",
      '-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', '-compression_level', '6',
      $temporaryCover
    )
  } else {
    $coverArguments = @(
      '-hide_banner', '-y', '-ss', $CoverTime.ToString([Globalization.CultureInfo]::InvariantCulture), '-i', $temporaryVideo,
      '-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', '-compression_level', '6',
      $temporaryCover
    )
  }
  & $ffmpeg @coverArguments
  if ($LASTEXITCODE -ne 0) { throw 'Static cover creation failed.' }

  $previewWidth = if ($orientation -eq 'vertical') { 360 } else { 480 }
  $previewStartText = $PreviewStart.ToString([Globalization.CultureInfo]::InvariantCulture)
  $previewDurationText = $PreviewDuration.ToString([Globalization.CultureInfo]::InvariantCulture)
  $hoverArguments = @(
    '-hide_banner', '-y', '-ss', $previewStartText, '-t', $previewDurationText, '-i', $temporaryVideo,
    '-an', '-vf', "fps=8,scale=$previewWidth`:-2`:flags=lanczos",
    '-c:v', 'libwebp', '-quality', '60', '-compression_level', '6', '-loop', '0',
    $temporaryHover
  )
  & $ffmpeg @hoverArguments
  if ($LASTEXITCODE -ne 0) { throw 'Animated hover preview creation failed.' }

  Move-Item -LiteralPath $temporaryVideo -Destination $videoOutput -Force
  Move-Item -LiteralPath $temporaryCover -Destination $coverOutput -Force
  Move-Item -LiteralPath $temporaryHover -Destination $hoverOutput -Force
} finally {
  foreach ($temporaryOutput in @($temporaryVideo, $temporaryCover, $temporaryHover)) {
    if (Test-Path -LiteralPath $temporaryOutput) {
      Remove-Item -LiteralPath $temporaryOutput -Force
    }
  }
}

[pscustomobject]@{
  Video = $videoOutput
  Cover = $coverOutput
  HoverPreview = $hoverOutput
  OutputDimensions = "$outputWidth`x$outputHeight"
  OptimizedSizeMB = [Math]::Round((Get-Item -LiteralPath $videoOutput).Length / 1MB, 2)
} | Format-List
