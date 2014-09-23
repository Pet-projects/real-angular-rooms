#!/bin/bash
set -x
set -e

SCRIPT_DIR=`dirname $0`


function inFolder {
    local folder=$1
    local cmd=$2

    pushd .
    cd "${folder}"

    $cmd

    popd
}

function inFront {
    inFolder "${SCRIPT_DIR}/frontEnd" "$1"
}

function inTest {
    inFolder "${SCRIPT_DIR}/test" "$1"
}


function performInstall {
    inFront "npm install"
    inTest "npm install"
}

function performStart {
    inFront "npm start"
    sleep 1
    inFront "npm run status"
    curl http://localhost:3000/#/beers
}


function performStop {
    inFront "npm stop"
}

function performTest {
    inTest "npm test"
}

function performLogs {
    inFront "cat ./log/appOutFile.log"
    inFront "cat ./log/appErrFile.log"
}

####### The arguments
function usage {
cat << EOF
usage: $0 [options] <install|start|stop|test|show-logs>

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