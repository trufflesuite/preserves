#!/usr/bin/env bash

# The below tells bash to stop the script if any of the commands fail
set -ex

## Get the latest branch states
git checkout master
git pull origin master
git checkout develop
git pull origin develop

## Build
yarn bootstrap

# list of packages that would be subjects of the next `lerna version` or `lerna publish`
lerna changed
