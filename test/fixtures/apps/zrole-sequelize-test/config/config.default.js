'use strict';

const { SequelizeAdapter } = require('casbin-sequelize-adapter');

exports.keys = '123456';

exports.zrole = {
  useAdapter: true,
  usePolicyInit: true,
  model: './example/zrole_model.conf',
  getUser: ctx => {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    }
    return null;
  },
  adapterConfig: async () => {
    const connect = await SequelizeAdapter.newAdapter(
      {
        host: 'db4free.net',
        port: 3306,
        database: 'ztest123',
        username: 'ztest123',
        password: 'qwer1234',
        dialect: 'mysql',
      },
      true
    );
    return connect;
  },
  initPolicy: zrole => {
    zrole.addPolicy('xdd', '/', 'GET');
    zrole.addPolicy('xdd', '/remove', 'GET');
  },
};
