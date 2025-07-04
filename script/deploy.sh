#!/bin/bash

set -euo pipefail

pushd . >/dev/null
cd "$(dirname "$0")/.." || exit 1

HOST=keijupeli.pomeranssi.fi

REV="$(git rev-parse HEAD | cut -c 1-8)"
export REV

script/build-prod.sh

echo "Copying files to production (rev $REV)..."

ssh deployer@$HOST "mkdir -p keijupeli/deploy" || exit 1
scp deploy/client-$REV.tar.gz deploy/server-$REV.tar.gz deployer@$HOST:~/keijupeli/deploy || exit 1

echo "Deploying on server..."

ssh deployer@$HOST "bash --login -c 'cd ~/keijupeli && git pull && script/install-prod.sh $REV'"

popd >/dev/null
