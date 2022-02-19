#!/usr/bin/env bash

# The below tells bash to stop the script if any of the commands fail
set -ex

## Obtain/check npm access
npm whoami
if [ "$?" != "0" ]; then
  npm login
fi
node ./scripts/npm-access.js

## Publish packages to npm
lerna version
lerna publish from-package 

## Update git branches
git checkout master
git merge develop
git push origin master
git checkout develop
git pull origin master

echo -e "\n\nBùcuò\! Woo\! Yes\!"
