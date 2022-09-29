#!/bin/bash

echo "Active server:"
ps -ef | grep keijupeliServer | grep -v grep
