'use strict';

const { SequelizeAdapter } = require('casbin-sequelize-adapter');

exports.keys = '123456';

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
    const connect = await SequelizeAdapter.newAdapter('mysql://ztest123:qwer1234@db4free.net:3306/ztest123`, true)');
    return connect;
  },
  initPolicy: zrole => {
    zrole.addPolicy('xdd', '/', 'GET');
    zrole.addPolicy('xdd', '/remove', 'GET');
  },
};
