#!/bin/sh

docker compose -f docker-compose.yml build --no-cache
docker compose -f docker-compose.yml --compatibility up -d


