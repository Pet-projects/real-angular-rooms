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


function performTest {
    inFront "npm start"
    sleep 1
    inFront "npm run status"
    inTest "npm test"
    inFront "npm stop"
}

####### The arguments
function usage {
cat << EOF
usage: $0 [options] <install|test>

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
   "test")
      performTest
      ;;
   ?)
     usage
     exit
     ;;
esac