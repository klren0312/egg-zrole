'use strict';

exports.keys = '123456';

exports.zrole = {
  useAnonymous: true,
  useCustomResponse: true,
  model: './example/zrole_model.conf',
  policy: './example/zrole_policy.csv',
  getUser: ctx => {
    if (ctx.headers.authorization) {
      try {
        const auth = JSON.parse(ctx.headers.authorization);
        return auth;
      } catch (error) {
        return ctx.headers.authorization;
      }
    }
    return null;
  },
  customResponse: ctx => {
    ctx.status = 403;
    ctx.body = 'Your do not has permission to access';
  },
  useSuperManage: 'admin',
};
