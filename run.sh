#!/bin/zsh

docker compose down -v
docker compose up --build


docker exec -it postgres_db psql -U admin -d mydb
# \dt
# SELECT COUNT(*) FROM events;
# SELECT * FROM events LIMIT 5;
# \q
