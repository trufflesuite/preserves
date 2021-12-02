Move the preserve* packages from trufflesuite.

## TODO

- [ ] Add proper readme
- [ ] Update new website build to source preserve docs from this repo
- [ ] Clean tags on this repo (no need to have truffle version tags)
    - [ ] current history has truffle publish commits which should be cleaned up to remove referencing truffle
          however these commits might bump the underlying @truffle/preserve* package in this monorepo whch need
          to remain.
- [ ] Build CHANGELOG.md
- [x] Set up husky
  - [x] eslint
  - [x] eslint
  - [x] lint-staged
- [ ] Establish github branch protection
  - [ ] Set master and develop workflow
- [ ] Determine publishing method
  - [ ] Update publishing details 
    - [ ] admin info on npmjs
    - [x] package.json urls need to point this repo
  - [ ] GH CI based publish would be nice to have. 
    - [ ] may need conventional commits
    - [ ] should this monorepo respect independent versioning? which is
          different from truffle's scheme
- [ ] Remove packages from trufflesuite monorepo when complete
