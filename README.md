This is the monorepo for the truffle preserve framework which includes:

- @truffle/preserve which is the preserve framework
- @truffle/preserve-fs, which represents the thing you want to preserve, files
- @truffle/preserve-to-buckets, needed to preserve your thing to textile buckets
- @truffle/preserve-to-filecoin, needed to preserve your thing to filecoin
- @truffle/preserve-to-ipfs, needed to preserve your thing to IPFS

[See guide about truffle preserve here](https://trufflesuite.com/docs/truffle/getting-started/preserving-files-and-content-to-storage-platforms.html#preserving-files-and-content-to-storage-platforms)

## Release tasks

Some coordination with Truffle's release is needed. The idea is to publish
`@truffle/preserves` after bumping the version of every `@truffle/preserve*`
package, followed by a new Truffle release that updates its `@truffle/preserve*`
dependencies.

- [ ] Make trufflesuite/preserves repo public
  - [ ] make issue for OS X M1 test failure (see below)
  - [ ] make issue to remove package.resolutions.typescript that pins typescript (see below)
- [ ] Update this README, to remove tasks
- [ ] Bump versions
  - [ ] use lerna command to bump (need to write command here)
- [ ] Publish preserve packages
  - [ ] use lerna command to publish (need to write command here)
- [ ] Merge [PR on truffle monorepo](https://github.com/trufflesuite/truffle/pull/4740)
- [ ] Subsequent Truffle release will have to bump its @truffle/preserve\* dependencies

## Tasks

- [ ] Test typedoc generated assets
- [ ] Test publishing script using Verdaccio
- [x] Configure husky and lint-staged.
- [x] Document changes, especially the pinned ganache deps. This is trackable in package.json `resolution`
- [x] Update package.json urls to point to this repo

## Build notes

- OS X M1 tests failures. Make an issue when making repo public.
  <details>
  <summary>NODEJS v16.14.0, NPM v6.14.16</summary>

  ```console
  @truffle/preserve-to-ipfs:  FAIL  test/ipfs.test.ts
  @truffle/preserve-to-ipfs:   ● Test suite failed to run
  @truffle/preserve-to-ipfs:     This version of µWS is not compatible with your Node.js build:
  @truffle/preserve-to-ipfs:     Error: Cannot find module './uws_darwin_arm64_93.node'
  @truffle/preserve-to-ipfs:       at ../../node_modules/ganache/dist/node/webpack:/Ganache/core/node_modules/@seesemichaelj/uwebsockets.js/src/uws.js:30:9
  @truffle/preserve-to-ipfs:       at Object.call (../../node_modules/ganache/dist/node/webpack:/Ganache/core/node_modules/@seesemichaelj/uwebsockets.js/src/uws.js:18:18)
  @truffle/preserve-to-ipfs:       at __webpack_require__ (../../node_modules/ganache/dist/node/webpack:/Ganache/webpack/bootstrap:18:32)
  @truffle/preserve-to-ipfs:       at Object.call (../../node_modules/ganache/dist/node/webpack:/Ganache/core/lib/src/server.js:22:42)
  @truffle/preserve-to-ipfs:       at __webpack_require__ (../../node_modules/ganache/dist/node/webpack:/Ganache/webpack/bootstrap:18:32)
  @truffle/preserve-to-ipfs:       at Object.call (../../node_modules/ganache/dist/node/webpack:/Ganache/core/lib/index.js:8:34)
  @truffle/preserve-to-ipfs:       at __webpack_require__ (../../node_modules/ganache/dist/node/webpack:/Ganache/webpack/bootstrap:18:32)
  @truffle/preserve-to-ipfs:       at Object.call (../../node_modules/ganache/dist/node/webpack:/Ganache/cli/lib/index.js:7:32)
  @truffle/preserve-to-ipfs:       at __webpack_require__ (../../node_modules/ganache/dist/node/webpack:/Ganache/webpack/bootstrap:18:32)
  @truffle/preserve-to-ipfs:       at Object.31416 (../../node_modules/ganache/dist/node/webpack:/Ganache/index.ts:1:1)
  @truffle/preserve-to-ipfs:   console.warn
  @truffle/preserve-to-ipfs:     bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)
  @truffle/preserve-to-ipfs:
  @truffle/preserve-to-ipfs:       at Object.call (../../node_modules/@ganache/filecoin/dist/node/webpack:/Filecoin-flavoredpackages/utils/node_modules/bigint-buffer/dist/node.js:10:17)
  @truffle/preserve-to-ipfs:       at __webpack_require__ (../../node_modules/@ganache/filecoin/dist/node/webpack:/Filecoin-flavored Ganache/webpack/bootstrap:18:32)
  @truffle/preserve-to-ipfs:       at Object.call (../../node_modules/@ganache/filecoin/dist/node/webpack:/Filecoin-flavoredsrc/utils/bigint-to-buffer.ts:19:26)
  @truffle/preserve-to-ipfs:       at __webpack_require__ (../../node_modules/@ganache/filecoin/dist/node/webpack:/Filecoin-flavored Ganache/webpack/bootstrap:18:32)
  @truffle/preserve-to-ipfs:       at Object.call (../../node_modules/@ganache/filecoin/dist/node/webpack:/Filecoin-flavoredsrc/utils/index.ts:1:1)
  @truffle/preserve-to-ipfs:       at __webpack_require__ (../../node_modules/@ganache/filecoin/dist/node/webpack:/Filecoin-flavored Ganache/webpack/bootstrap:18:32)
  @truffle/preserve-to-ipfs:       at Object.2718 (../../node_modules/@ganache/filecoin/dist/node/webpack:/Filecoin-flavoredindex.ts:2:1)
  @truffle/preserve-to-ipfs: Test Suites: 1 failed, 1 total
  @truffle/preserve-to-ipfs: Tests:       0 total
  @truffle/preserve-to-ipfs: Snapshots:   0 total
  @truffle/preserve-to-ipfs: Time:        2.391 s
  @truffle/preserve-to-ipfs: Ran all test suites.
  @truffle/preserve-to-ipfs:
  @truffle/preserve-to-ipfs: Jest has detected the following 1 open handle potentially keeping Jest from exiting:
  @truffle/preserve-to-ipfs:
  @truffle/preserve-to-ipfs:   ●  TickObject
  @truffle/preserve-to-ipfs:       at new Decoder (../../node_modules/borc/src/decoder.js:58:19)
  @truffle/preserve-to-ipfs:       at configureDecoder (../../node_modules/ipld-dag-cbor/src/util.js:120:13)
  @truffle/preserve-to-ipfs:       at Object.<anonymous> (../../node_modules/ipld-dag-cbor/src/util.js:125:1)
  @truffle/preserve-to-ipfs: (node:15463) V8: /Users/amal/work/preserves/node_modules/borc/src/decoder.asm.js:3 Linking failure in asm.js: Unexpected stdlib member
  @truffle/preserve-to-ipfs: (Use `node --trace-warnings ...` to show where the warning was created)
  @truffle/preserve-to-ipfs: (node:15463) V8: /Users/amal/work/preserves/node_modules/ganache/dist/node/ganache.min.js:2 Linking failure in asm.js: Unexpected stdlib member
  error Command failed with exit code 1.
  ```

  </details>

### yarn resolutions

- typescript is pinned to 4.2.4 because typedoc doesn't work with any later version. Create issue to update @truffle/preserve to latest version of typedoc (>=0.20.34)
- @ganache/filecoin: "0.1.2",
- ganache: "3.0.0-filecoin.3"
