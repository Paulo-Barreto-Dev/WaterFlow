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
$env:Path = "$(Join-Path $env:JAVA_HOME 'bin');$(Join-Path $env:ANDROID_HOME 'platform-tools');$env:Path"
