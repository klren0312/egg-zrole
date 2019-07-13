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
  useAnonymous: false,
  usePolicyInit: false,
  useCustomResponse: false,
  model: '/example/zrole_model.conf',
  policy: '/example/zrole_policy.csv',
  adapterConfig: () => {},
  getUser: (ctx) => {},
  initPolicy: () => {},
  customResponse: (ctx) => {},
  useAutoMiddleware: true,
};
```

**Tips:**

 - In `> 1.0.5` you don't need to add the `zrole` to middleware.
 - You must set the `model` path; When you don't use the adapter, you also need to set `policy` path.
 - If your userinfo not in the `Authorization`, you should use `getUser` method to set how to get userinfo that can check the user role.
 - If use some casbin adapter, you need make `useAdapter` to `true`, then config the adapter, use `adapterConfig` method.
 - If you need to init the policy, you can set `usePolicyInit` to `true`, and use `initPolicy` method to set role.
 - If you need to custom your response, when 403; You can set `useCustomResponse` to `true`, and use `customResponse` method to custom the response.
 - If you need to use default `anonymous` role, you can set `useAnonymous` to `true`.
 - In v1.3.0, you can set `useAutoMiddleware` to false (default is true), then the zrole middleware will not add to your middleware array, you need to write middleware yourself.

see [config/config.default.js](config/config.default.js) for more detail.

## Example
> Details Project Later

Now, You can see [test/fixtures](test/fixtures), there are two example

### 1.[test/fixtures/zrole-sequelize-test](test/fixtures/zrole-sequelize-test).
> this test project, show the following features: 
>1.sequelize adapter; 2.init policy

 - Use `Sequlize` and `MySQL` to control permission, in controller file, you can see `this.app.zrole.addPolicy('xdd', '/', 'GET')`, it test the policy's dynamic addition; and you need to set `useAdapter` to `true`;
 - The casbin sequelize adapter, we use `casbin-sequelize-adapter`, about it, you can see https://github.com/node-casbin/sequelize-adapter
 - It will auto create the database that name is `casbin`, when you don't set the database, and don't set `SequelizeAdapter.newAdapter` second params to `ture`
 - If you want to use own database, you can set `adapterConfig`:

```javascript
// example config.default.js
exports.zrole = {
  useAdapter: true,
  usePolicyInit: true,
  model: './example/zrole_model.conf',
  policy: './example/zrole_policy.csv',
  getUser: ctx => {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    }
    return null;
  },
  adapterConfig: async () => {
    const connect = await SequelizeAdapter.newAdapter('mysql://root:@localhost:3306/');
    return connect;
  },
  initPolicy: zrole => {
    zrole.addPolicy('xdd', '/', 'GET');
    zrole.addPolicy('xdd', '/remove', 'GET');
  },
};
```

### 2.[test/fixtures/zrole-test](test/fixtures/zrole-test).
> this test project, show the following features: 
>1.anonymous; 2.custom response

model and policy use the fixed file
If you set `useAnonymous` to `true`, the request that has no header(Authorization) will be the `anonymous` user. It will access the `anonymous` api, like,
```
p, anonymous, /anonymous, GET
```

```javascript
// example
exports.zrole = {
  useAnonymous: true,
  useCustomResponse: true,
  model: './example/zrole_model.conf',
  policy: './example/zrole_policy.csv',
  getUser: ctx => {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    }
    return null;
  },
  customResponse: ctx => {
    ctx.status = 403;
    ctx.body = 'Your do not has permission to access';
  },
};
```

### 3.[test/fixtures/zrole-no-auto-add-middleware-test](test/fixtures/zrole-no-auto-add-middleware-test).
> this test project, show the following features: 
>1.use custom middleware


```javascript
// example
exports.zrole = {
  useAutoMiddleware: false,
  model: './example/zrole_model.conf',
  policy: './example/zrole_policy.csv',
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/klren0312/egg-zrole).

## License

[MIT](LICENSE)
