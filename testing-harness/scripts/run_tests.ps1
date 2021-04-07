$scriptName = $myInvocation.MyCommand.Name
function usage() {
    Write-Output "Usage: $scriptName [-n]"
    Write-Output "-n: do not start a new cql-translation-service container"
    exit 1
}

$NO_START = 0

for($i = 0; $i -lt $ARGS.length; $i++){
    switch ($ARGS[$i]) {
        "-n" { $NO_START = 1; Break }
        "-h" { usage; exit 0 }
        default { usage; exit 1 }
    }
}

# Don't start new container if user wants to keep existing running server
if ($NO_START -eq 0) {
    Write-Output "> Starting cql-translation-service"

    $RUNNING_PID = $(docker ps | Select-String "cqframework/cql-translation-service" | %{$_.Line.Split(' ')[0]})
    if ($RUNNING_PID) {
        Write-Output "> Stopping existing container"
        docker stop $RUNNING_PID
    }

    docker run --name cql-translation-service --rm -d -p 8080:8080 cqframework/cql-translation-service:latest

    Write-Output "> Waiting for server"

    # Wait for cql-translation-service
    try {Invoke-WebRequest -URI http://localhost:8080/cql/translator} catch {$StatusCode = $_.Exception.Response.StatusCode.value__}
    while ( $StatusCode -ne 405 ) {
        Write-Host -NoNewline "."
        Start-Sleep -s 1
        try {Invoke-WebRequest -URI http://localhost:8080/cql/translator} catch {$StatusCode = $_.Exception.Response.StatusCode.value__}
    }
}

Write-Output "> Translating CQL"

yarn translate

if ( $? -ne $TRUE ) {
    exit 1
}

Write-Output "> Running unit tests"

yarn test:unit

if ($NO_START -eq 0) {
    Write-Output "> Stopping cql-translation-service"
    docker stop cql-translation-service
}