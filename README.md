# egg-zrole

[![NPM version][npm-image]][npm-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-zrole.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-zrole
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
> Details Project Later

Now, You can see [test/fixtures](test/fixtures), there are two example

### 1.[test/fixtures/zrole-sequelize-test](test/fixtures/zrole-sequelize-test).

 - Use `Sequlize` and `MySQL` to control permission, in controller file, you can see `e.addPolicy('xdd', '/', 'GET')`, it test the policy's dynamic addition; and you need to set `useAdapter` to `true`
 - The casbin sequelize adapter, we use `casbin-sequelize-adapter`, about it, you can see https://github.com/node-casbin/sequelize-adapter
 - It will auto create the database that name is `casbin`, when you don't set the database, and don't set `SequelizeAdapter.newAdapter` second params to `ture`
 - If you want to use own database, you can set `adapterConfig`:
```javascript
// example config.default.js
exports.zrole = {
  useAdapter: true,
  model: './example/zrole_model.conf',
  getUser(ctx) {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    }
    return null;
  },
  adapterConfig: async () => {
    const connect =  await SequelizeAdapter.newAdapter(`mysql://root:@localhost:3306/yourDatabase`, true)
    return connect
  }
};
```

### 2.[test/fixtures/zrole-test](test/fixtures/zrole-test).

model and policy use the fixed file

```javascript
// example
exports.zrole = {
  useAdapter: false,
  model: './example/zrole_model.conf',
  policy: './example/zrole_policy.csv',
  getUser(ctx) {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    }
    return null;
  }
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/klren0312/egg-zrole).

## License

[MIT](LICENSE)
