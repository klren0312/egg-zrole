'use strict';

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


module.exports = app => {
  app.zrole = createZrole(app.config.zrole);
};

