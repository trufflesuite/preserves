#! /usr/bin/env sh

NODE_VERSION="$(node --version)"

# If Node version >=12 we run tests
if yarn semver -r ">=12" "$NODE_VERSION"; then
  if [ -z "${NODE_TRACE_WARNINGS}" ]; then
    yarn jest --verbose --detectOpenHandles "$@"
  else
    node --trace-warnings ../../node_modules/.bin/jest --verbose --detectOpenHandles "$@"
  fi

# Otherwise we skip the tests since IPFS requires at least Node 12
else
    true
fi
