#!/bin/bash

pushd . >/dev/null
cd `dirname $0`/..

mkdir -p log

echo "Starting server"
NODE_ENV=production nohup node -r ./tsconfig-paths-bootstrap.js build-server/server/keijupeliServer.js >log/server.log 2>&1 &

popd >/dev/null
