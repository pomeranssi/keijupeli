#!/bin/bash

pushd . >/dev/null
cd "$(dirname "$0")/.." || exit 1

echo "Updating dependencies"
yarn || exit 1

mkdir -p deploy || exit 1

REV="$(git rev-parse HEAD | cut -c 1-8)"
echo "Building server, revision $REV..."

yarn clean || exit 1
yarn build-server || exit 1

cd build-server || exit 1
tar czvf ../deploy/server-$REV.tar.gz . || exit 1
cd ..

echo "Server built"

echo "Building client, revision $REV"

yarn clean || exit 1
yarn build-client || exit 1

echo "Clearing locally uploaded images"
rm -rf build/images/items

cd build || exit 1
tar czvf "../deploy/client-$REV.tar.gz" . || exit 1
cd ..

echo "Client built"

echo "Built revision $REV"

popd >/dev/null || exit 1
