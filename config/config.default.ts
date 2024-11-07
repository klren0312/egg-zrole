'use strict';

/**
 * egg-zrole default config
 * @member Config#zrole
 * @property {String} SOME_KEY - some description
 */
exports.zrole = {
  model: '/example/zrole_model.conf',
  policy: '/example/zrole_policy.csv',
  getUser: (/* ctx */) => {},
  useAdapter: false,
  adapterConfig: () => {},
  useAnonymous: false,
  usePolicyInit: false,
  initPolicy: (/* ctx */) => {},
  useCustomResponse: false,
  customResponse: (/* ctx */) => {},
  useAutoMiddleware: true, // issue #5: https://github.com/klren0312/egg-zrole/issues/5
  useSuperManage: 'admin', // issue $6: https://github.com/klren0312/egg-zrole/issues/6
};
