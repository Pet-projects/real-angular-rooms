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
    inFolder "${SCRIPT_DIR}/backEnd" "$1"
}

function inFront {
    inFolder "${SCRIPT_DIR}/frontEnd" "$1"
}

function inDbSetup {
    inFolder "${SCRIPT_DIR}/db/setup" "$1"
}

function inTest {
    inFolder "${SCRIPT_DIR}/test" "$1"
}


function performInstall {
    inDbSetup "npm install"
    inBack "npm install"
    inFront "npm install"
    inTest "npm install"
}

function performDbSetup {
    inDbSetup "npm run db-setup"
}

function performStart {
    inBack "npm start"
    inFront "npm start"
    sleep 1
    inFront "npm run status"
    inBack "npm run status"
    curl -L 'http://localhost:3000'
}


function performStop {
    inFront "npm stop"
    inBack "npm stop"
}

function performTest {
    inTest "npm test"
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
usage: $0 [options] <install|db-setup|start|stop|test|show-logs>

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
   "db-setup")
      performDbSetup
      ;;
   "start")
      performStart
      ;;
   "stop")
      performStop
      ;;
   "test")
      performTest
      ;;
   "show-logs")
      performLogs
      ;;
   ?)
     usage
     exit
     ;;
esac