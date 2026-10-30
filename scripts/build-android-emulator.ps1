$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot 'use-local-android.ps1')

# Ninja expands source paths into object paths. A physical short copy avoids
# Windows path limits and keeps all React Native paths on the same drive.
$stage = Join-Path ($env:SystemDrive + '\') 'w'
if (Test-Path -LiteralPath $stage) {
  throw "Temporary build path already exists: $stage"
}

function Copy-Tree {
  param([string]$Source, [string]$Destination, [string[]]$ExcludeDirectories)

  & robocopy $Source $Destination /E /XD $ExcludeDirectories /NFL /NDL /NJH /NJS /NP
  if ($LASTEXITCODE -gt 7) {
    throw "Robocopy failed with exit code ${LASTEXITCODE}: $Source"
  }
}

$stageParent = [IO.Path]::GetFullPath((Split-Path -Parent $stage)).TrimEnd('\')
if ($stageParent -ne $env:SystemDrive -or (Split-Path -Leaf $stage) -ne 'w') {
  throw 'Unsafe temporary build path.'
}

New-Item -ItemType Directory -Path $stage | Out-Null
try {
  Copy-Tree $projectRoot $stage @('.git', '.local-tools', '.expo', 'dist', 'node_modules', 'android')
  Copy-Tree (Join-Path $projectRoot 'node_modules') (Join-Path $stage 'node_modules') @('.cxx')
  Copy-Tree (Join-Path $projectRoot 'android') (Join-Path $stage 'android') @('build', '.gradle', '.cxx')

  $env:GRADLE_USER_HOME = Join-Path $env:USERPROFILE '.gradle'
  Push-Location (Join-Path $stage 'android')
  try {
    & .\gradlew.bat :app:assembleDebug -PreactNativeArchitectures=x86_64 --offline --console=plain
    if ($LASTEXITCODE -ne 0) { throw "Gradle failed with exit code $LASTEXITCODE" }
  } finally {
    Pop-Location
  }

  $apk = Join-Path $stage 'android\app\build\outputs\apk\debug\app-debug.apk'
  if (-not (Test-Path -LiteralPath $apk)) { throw "APK not found: $apk" }
  $outputDir = Join-Path $projectRoot '.local-tools\builds'
  New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
  $outputApk = Join-Path $outputDir 'waterflow-dev-x86_64.apk'
  Copy-Item -LiteralPath $apk -Destination $outputApk -Force

  & (Join-Path $env:ANDROID_HOME 'platform-tools\adb.exe') -e install -r $outputApk
  if ($LASTEXITCODE -ne 0) { throw "ADB install failed with exit code $LASTEXITCODE; APK saved at $outputApk" }
  Write-Output "Development build installed: $outputApk"
} finally {
  Remove-Item -LiteralPath $stage -Recurse -Force
}
