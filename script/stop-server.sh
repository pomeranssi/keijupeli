#!/bin/bash

echo "Shutting down server"
PIDS=`ps -ef | grep keijupeliServer | grep -v grep | awk '{print $2;}'`

if [ "$PIDS" != "" ]; then
  echo "Killing processes $PID"
  ps -ef | grep keijupeliServer | grep -v grep | awk '{print $2;}' | xargs kill
else
  echo "Server not active"
fi
