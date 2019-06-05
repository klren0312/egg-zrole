'use strict';

const assert = require('assert');
const { Enforcer, newEnforcer } = require('casbin');

const createZrole = async config => {
  let enforcer;
  if (!config.useAdapter) {
    enforcer = await newEnforcer(config.model, config.policy);
  } else {
    const connect = await config.adapterConfig();
    enforcer = await newEnforcer(config.model, connect);
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
  });

  // auto add `zrole` to the middleware
  const index = config.appMiddleware.indexOf(MIDDLEWARE_NAME);
  assert.equal(
    index,
    -1,
    `Duplication of middleware name found: ${MIDDLEWARE_NAME}. Rename your middleware other than "${MIDDLEWARE_NAME}" please.`
  );

  config.appMiddleware.unshift(MIDDLEWARE_NAME);
};

