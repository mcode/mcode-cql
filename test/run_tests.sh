#!/bin/sh

echo "> Starting cql-translation-service"

RUNNING_PID=$(docker ps | grep "cqframework/cql-translation-service" | awk '{ print $1 }')

if [[ ! -z $RUNNING_PID ]]
then
  echo "> Stopping existing container"
  docker stop $RUNNING_PID
fi

docker run --name cql-translation-service --rm -d -p 8080:8080 cqframework/cql-translation-service:latest

echo "> Waiting for server"

# Wait for cql-translation-service
curl --silent http://localhost:8080/cql/translator > /dev/null
while [ $? -ne 0 ]
do
  printf "."
  sleep 1
  curl --silent http://localhost:8080/cql/translator > /dev/null
done

echo "> Translating CQL"

yarn translate

if [ $? -ne 0 ] ; then exit 1 ; fi

echo "> Running unit tests"

yarn test:unit

echo "> Stopping cql-translation-service"
docker stop cql-translation-service
