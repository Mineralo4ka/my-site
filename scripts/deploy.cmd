@echo off
setlocal

set "BASH_EXE=%ProgramFiles%\Git\bin\bash.exe"

if not exist "%BASH_EXE%" (
  echo Git Bash was not found at "%BASH_EXE%".
  echo Install Git for Windows or add bash.exe to PATH.
  exit /b 1
)

"%BASH_EXE%" "%~dp0deploy.sh"
