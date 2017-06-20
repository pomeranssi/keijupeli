#!/bin/sh

ssh deployer@pomeranssi.fi "bash --login -c 'cd ~/ilonapeli && git pull && cd keijupeli && npm run build'"

