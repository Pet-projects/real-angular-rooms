#!/bin/bash
set -x
set -e

SCRIPT_DIR=`dirname $0`
RED='\x1B[0;31m'
GREEN='\x1B[0;32m'
NC='\x1B[0m'

function inFolder {
    local folder=$1
    local cmd=$2

    pushd .
    cd "${folder}"

    $cmd

    popd
}

function inTest {
    inFolder "${SCRIPT_DIR}/e2e" "$1"
}

function performTest {
    inTest "npm test"
}


####### The arguments
function usage {
cat << EOF
usage: $0 [options] <run>

Control the app
EOF
}

if [ $# -ne 1 ]; then
	usage
	exit 1
fi

case "$1" in
   "run")
      performTest
      ;;
   ?)
     usage
     exit
     ;;
esac