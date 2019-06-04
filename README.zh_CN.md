# egg-zrole

[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-zrole.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-zrole
[snyk-image]: https://snyk.io/test/npm/egg-zrole/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-zrole
[download-image]: https://img.shields.io/npm/dm/egg-zrole.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-zrole

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-zrole 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

### 依赖的插件

 - casbin

## 开启插件

```js
// config/plugin.js
exports.zrole = {
  enable: true,
  package: 'egg-zrole',
};
```

## 使用场景

- 这个插件主要就是为了更好的在EggJS里使用casbin, 完成权限管理相关功能开发。
- 有两个例子可以在[test/fixtures](test/fixtures)里看到

## 详细配置

```js
// {app_root}/config/config.default.js
exports.zrole = {
  useAdapter: false,
  model: '/example/zrole_model.conf',
  policy: '/example/zrole_policy.csv',
  adapterConfig: () => {}
};
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。


## 提问交流

请到 [egg issues](https://github.com/eggjs/egg/issues) 异步交流。

## License

[MIT](LICENSE)
