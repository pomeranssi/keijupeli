#!/usr/bin/env bash

export LANG="fi_FI.UTF-8"

DUMP=prod.dump
source ./.env

if [ "$DB_URL" = "" ]
then
  echo "DB_URL is not set in .env"
  exit 1
fi

if [ "$PROD_DB_URL" = "" ]
then
  echo "PROD_DB_URL is not set in .env"
  exit 1
fi

PORT=3432
[[ $# -gt 0 ]] && PORT="$1" && shift

if [ -f "$DUMP" ]
then
  echo "Using existing DB dump $DUMP"
else
  echo "Loading prod DB to $DUMP"
  pg_dump -x -O -Ft "$PROD_DB_URL" >$DUMP || exit 1
fi

echo "localhost:$PORT:*:*:postgres" >.pgpass
chmod 0600 .pgpass
export PGPASSFILE=.pgpass

echo "Clearing local database"

echo "DROP SCHEMA public CASCADE" | psql "$DB_URL"
echo "CREATE SCHEMA public" | psql "$DB_URL"

echo "Restoring prod DB dump"
pg_restore --role=keijupeli --no-owner -d "$DB_URL" --no-acl <$DUMP

psql "$DB_URL" -c "UPDATE users set password=encode(digest('salasana', 'sha256'), 'hex');"

rm $DUMP

echo "All done!"
