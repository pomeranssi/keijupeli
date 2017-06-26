#!/bin/sh

ssh deployer@pomeranssi.fi "bash --login -c 'cd ~/keijupeli && git pull && npm install && npm run build'"

