#!/bin/bash
echo 'building for' $ENV 'environment'
rm -rf ./dist/*
NODE_ENV=$ENV ./node_modules/.bin/eslint ./src/standalone/**.js
NODE_ENV=$ENV ./node_modules/.bin/${TOOL} --config ./${TOOL}/standalone.js --environment ENV:$ENV
NODE_ENV=$ENV ./node_modules/.bin/terser --compress --mangle -- dist/notOverlay.js > ./dist/notOverlay.min.js
exit 0;
