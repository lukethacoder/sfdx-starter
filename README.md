# sfdx-starter

A quick start repo for sfdx based projects.

## Features

- fflib/at4dx install script
- `prettier` & `eslint` config (feat. `githooks` to enforce `node_modules` install)
- helper scripts
- `project-scratch-def.json` config for communities, cms and knowledge
- `.vscode/tasks.json` Metadata tasks (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>)
- `.vscode/settings.json` to hide `.xml` files and less commonly used metadata. (This can be edited)
- Jest Testing

### fflib/at4dx

The script installs the following packages as a part of [the apex-enterprise-patterns](https://github.com/apex-enterprise-patterns).

- [fflib-apex-common](https://github.com/apex-enterprise-patterns/fflib-apex-common)
- [fflib-apex-mocks](https://github.com/apex-enterprise-patterns/fflib-apex-mocks)
- [force-di](https://github.com/apex-enterprise-patterns/force-di)
- [at4dx](https://github.com/apex-enterprise-patterns/at4dx)

Run the script with:

```cmd
node --harmony setup-fflib.mjs e- ORG_ALIAS
```

> [For more info, and an updated script](https://gist.github.com/lukethacoder/dd2af8ef3cc344b6dc15a9cd6a5569f2)

### Jest Testing

All tests can be run using:

```cmd
pnpm test
```

Jest testing uses the `@lwc/jest-*` packages, not `@salesforce/sfdx-jest-test`.
