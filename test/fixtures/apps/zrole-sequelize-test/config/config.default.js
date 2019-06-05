'use strict';

const { SequelizeAdapter } = require('casbin-sequelize-adapter');

exports.keys = '123456';

exports.zrole = {
  useAdapter: true,
  model: './example/zrole_model.conf',
  policy: './example/zrole_policy.csv',
  getUser(ctx) {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    }
    return null;
  },
  adapterConfig: async () => {
    const connect = await SequelizeAdapter.newAdapter('mysql://root:@localhost:3306/');
    return connect;
  },
};
