#!/usr/bin/env bash

# Usage:
# script/copy-prod-images.sh

cd `dirname $0`/..

mkdir -p upload/images/items

scp deployer@pomeranssi.fi:~/keijupeli/upload/images/items/* upload/images/items/
