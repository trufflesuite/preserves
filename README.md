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
