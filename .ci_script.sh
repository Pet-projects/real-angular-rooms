#!/bin/sh
set -x
set -e

baseFolder=`dirname $0`


# Start frontEnd app
pushd .
cd "${baseFolder}/frontEnd"
npm install
npm run start
popd

# Wait until app starts
sleep 1

# Test the app
pushd .
cd "${baseFolder}/test"
npm install
npm test
popd


# Stop frontEnd app
pushd .
cd "${baseFolder}/frontEnd"
npm install
npm run stop
popd