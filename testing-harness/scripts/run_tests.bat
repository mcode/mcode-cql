@echo off
setlocal enabledelayedexpansion

set /A NO_START = 0

for %%x in (%*) do (
    if %%x==-h (
        echo Usage: %~nx0% [-n]
        echo -n: do not start a new cql-translation-service container
        exit 1
    )
    if %%x==-n (
        set /A NO_START = 1
    ) else (
        echo Usage: %~nx0% [-n]
        echo -n: do not start a new cql-translation-service container
        exit 1
    )
)

:: Don't start new container if user wants to keep existing running server
if %NO_START%==0 (
    echo ^> Starting cql-translation-service
    for /f %%i in ('docker ps ^| find "cql-translation-service"') do if not %%i==0 echo ^> Stopping existing container && docker stop %%i

    docker run --name cql-translation-service --rm -d -p 8080:8080 cqframework/cql-translation-service:latest

    :: Wait for cql-translation-service
    echo ^> Waiting for server
    :Waiting
    echo | set /p="."
    timeout /t 1 > nul
    curl --silent http://localhost:8080/cql/translator > nul
    if errorlevel 1 goto Waiting
)

echo ^> Translating CQL

call yarn translate

if errorlevel 1 exit 1

echo ^> Running unit tests

call yarn test:unit

if %NO_START%==0 (
    echo ^> Stopping cql-translation-service
    docker stop cql-translation-service
)