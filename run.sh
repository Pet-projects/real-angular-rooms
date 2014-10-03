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

function inBack {
    inFolder "${SCRIPT_DIR}/api" "$1"
}

function inFront {
    inFolder "${SCRIPT_DIR}/webClient" "$1"
}

function inDbQuery {
    inFolder "${SCRIPT_DIR}/db/query" "$1"
}


function performInstall {
    inDbQuery "npm install"
    inBack "npm install"
    inFront "npm install"
}

function performRebuild {
    inDbQuery "npm rebuild"
    inBack "npm rebuild"
    inFront "npm rebuild"
}

function performStart {
    inBack "npm start"
    sleep 3
    inFront "npm start"
    sleep 3
    inFront "npm run status"
    inBack "npm run status"
    curl -L 'http://localhost:3000' && echo ""
    curl -L 'http://localhost:3000/api/rooms'  && echo ""
}


function performStop {
    inFront "npm stop"
    inBack "npm stop"
}

function performLogs {
    echo -e "${GREEN}>>>>>>> Front end logs ${NC}"
    inFront "cat ./log/appOutFile.log"
    inFront "cat ./log/appErrFile.log"
    echo -e "${GREEN}>>>> Back end logs${NC}"
    inBack "cat ./log/appOutFile.log"
    inBack "cat ./log/appErrFile.log"
}

####### The arguments
function usage {
cat << EOF
usage: $0 [options] <install | rebuild  start | stop | show-logs>

Control the app
EOF
}

if [ $# -ne 1 ]; then
	usage
	exit 1
fi

case "$1" in
   "install")
      performInstall
      ;;
   "rebuild")
      performRebuild
      ;;
   "start")
      performStart
      ;;
   "stop")
      performStop
      ;;
   "show-logs")
      performLogs
      ;;
   ?)
     usage
     exit
     ;;
esac