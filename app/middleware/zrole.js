'use strict';

module.exports = options => {
  return async (ctx, next) => {
    const { app } = ctx;
    try {
      const { originalUrl: path, method } = ctx;
      // If don't set the getUser method, it will jump
      if (!options.hasOwnProperty('getUser')) {
        await next();
        return false;
      }
      let user = options.getUser(ctx);
      const useAnonymous = options.hasOwnProperty('useAnonymous') ? options.useAnonymous : false;
      if (!user && useAnonymous) {
        user = 'anonymous';
      }
      // issue #6: https://github.com/klren0312/egg-zrole/issues/6
      // add multi role check
      let formatUser = [];
      // if user is single roles, convert to array
      if (!Array.isArray(user)) {
        formatUser = [ user ];
      } else {
        formatUser = user;
      }
      // add superManage check, it will direct jump role
      if (options.hasOwnProperty('useSuperManage') && formatUser.indexOf(options.useSuperManage) !== -1) {
        await next();
        return false;
      }
      const authArr = formatUser.map(v => app.zrole.enforce(v, path, method));
      const authzorizer = await Promise.all(authArr);
      // As long as there is one pass, it will pass
      if (!authzorizer.some(v => v === true)) {
        if (options.hasOwnProperty('useCustomResponse') && options.useCustomResponse) {
          options.customResponse(ctx);
        } else {
          ctx.status = 403;
        }
      } else {
        await next();
      }
    } catch (e) {
      throw e;
    }
  };
};
