$projectRoot = Split-Path -Parent $PSScriptRoot
$jdkRoot = Join-Path $projectRoot '.local-tools\jdk'
$sdkRoot = Join-Path $projectRoot '.local-tools\android-sdk'

$jdk = Get-ChildItem -LiteralPath $jdkRoot -Directory -ErrorAction SilentlyContinue |
  Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName 'bin\java.exe') } |
  Select-Object -First 1

if (-not $jdk -or -not (Test-Path -LiteralPath $sdkRoot)) {
  throw 'JDK ou Android SDK local ausente em .local-tools.'
}

$env:JAVA_HOME = $jdk.FullName
$env:ANDROID_HOME = $sdkRoot
$env:ANDROID_SDK_ROOT = $sdkRoot
$env:ANDROID_USER_HOME = Join-Path $projectRoot '.local-tools\android-user'
$env:ANDROID_AVD_HOME = Join-Path $projectRoot '.local-tools\avd'
New-Item -ItemType Directory -Force -Path $env:ANDROID_USER_HOME, $env:ANDROID_AVD_HOME | Out-Null
$env:Path = @(
  (Join-Path $env:JAVA_HOME 'bin')
  (Join-Path $env:ANDROID_HOME 'platform-tools')
  (Join-Path $env:ANDROID_HOME 'emulator')
  (Join-Path $env:ANDROID_HOME 'cmdline-tools\latest\bin')
  $env:Path
) -join ';'
