'use strict';

exports.keys = '123456';

exports.zrole = {
  useAdapter: false,
  model: './example/zrole_model.conf',
  policy: './example/zrole_policy.csv',
  getUser(ctx) {
    if (ctx.headers.authorization) {
      return ctx.headers.authorization;
    }
    return null;
  },
};
