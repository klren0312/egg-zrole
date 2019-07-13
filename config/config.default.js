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
  useAutoMiddleware: true,
};
