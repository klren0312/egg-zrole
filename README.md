# egg-zrole

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-zrole.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-zrole
[travis-image]: https://img.shields.io/travis/klren0312/egg-zrole.svg?style=flat-square
[travis-url]: https://travis-ci.org/klren0312/egg-zrole
[codecov-image]: https://img.shields.io/codecov/c/github/klren0312/egg-zrole.svg?style=flat-square
[codecov-url]: https://codecov.io/github/klren0312/egg-zrole?branch=master
[david-image]: https://img.shields.io/david/klren0312/egg-zrole.svg?style=flat-square
[david-url]: https://david-dm.org/klren0312/egg-zrole
[snyk-image]: https://snyk.io/test/npm/egg-zrole/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-zrole
[download-image]: https://img.shields.io/npm/dm/egg-zrole.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-zrole

<!--
Description here.
-->

## Install

```bash
$ npm i egg-zrole --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.zrole = {
  enable: true,
  package: 'egg-zrole',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.zrole = {
  useAdapter: false,
  model: '/example/zrole_model.conf',
  policy: '/example/zrole_policy.csv',
  adapterConfig: () => {}
};
```

**Tips:**

 - If use some casbin adapter, you need make `useAdapter` to `true`, then config the adapterConfig.

see [config/config.default.js](config/config.default.js) for more detail.

## Example
> Later
You can see [test/fixtures](test/fixtures)

## Questions & Suggestions

Please open an issue [here](https://github.com/klren0312/egg-zrole).

## License

[MIT](LICENSE)
