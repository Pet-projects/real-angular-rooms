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

function inDbSetup {
    inFolder "${SCRIPT_DIR}/db/setup" "$1"
}

function inDbQuery {
    inFolder "${SCRIPT_DIR}/db/query" "$1"
}

function performRebuild {
    inDbSetup "npm rebuild"
    inDbQuery "npm rebuild"
}

function performDbSetup {
    inDbSetup "npm run db-setup"
}

function performDbSeed {
    inDbQuery "npm run db-seed"
}

####### The arguments
function usage {
cat << EOF
usage: $0 [options] < setup | seed | npm-rebuild >

Control the app
EOF
}

if [ $# -ne 1 ]; then
	usage
	exit 1
fi

case "$1" in
   "setup")
      performDbSetup
      ;;
   "seed")
      performDbSeed
      ;;
   "npm-rebuild")
      performRebuild
      ;;
   ?)
     usage
     exit
     ;;
esac