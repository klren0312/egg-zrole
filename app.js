'use strict';

const assert = require('assert');
const { Enforcer, newEnforcer } = require('casbin');

/**
 * Init Casbin enforcer
 * @param {Object} config zrole config info
 */
const createZrole = async config => {
  let enforcer;
  if (config.hasOwnProperty('useAdapter') && config.useAdapter) {
    const connect = await config.adapterConfig();
    enforcer = await newEnforcer(config.model, connect);
  } else {
    enforcer = await newEnforcer(config.model, config.policy);
  }
  if (!(enforcer instanceof Enforcer)) {
    throw new Error('Invalid enforcer');
  }
  return enforcer;
};

const MIDDLEWARE_NAME = 'zrole';

module.exports = app => {
  const { config } = app;

  app.beforeStart(async () => {
    app.zrole = await createZrole(config.zrole);
    if (config.zrole.hasOwnProperty('usePolicyInit') && config.zrole.usePolicyInit) {
      config.zrole.initPolicy(app.zrole);
    }
  });
  // auto add `zrole` to the middleware
  const index = config.appMiddleware.indexOf(MIDDLEWARE_NAME);
  assert.equal(
    index,
    -1,
    `Duplication of middleware name found: ${MIDDLEWARE_NAME}. Rename your middleware other than "${MIDDLEWARE_NAME}" please.`
  );
  // if useAutoMiddleware is false, it will not add to middleware
  if (config.zrole.hasOwnProperty('useAutoMiddleware') && config.zrole.useAutoMiddleware) {
    config.appMiddleware.unshift(MIDDLEWARE_NAME);
  }
};
