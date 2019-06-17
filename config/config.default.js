'use strict';

/**
 * egg-zrole default config
 * @member Config#zrole
 * @property {String} SOME_KEY - some description
 */
exports.zrole = {
  useAdapter: false,
  useAnonymous: false,
  usePolicyInit: false,
  model: '/example/zrole_model.conf',
  policy: '/example/zrole_policy.csv',
  adapterConfig: () => {},
  getUser: (/* ctx */) => {},
  initPolicy: (/* ctx */) => {},
};
