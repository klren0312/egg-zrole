'use strict';

module.exports = options => {
  return async (ctx, next) => {
    const { app } = ctx;
    try {
      const { originalUrl: path, method } = ctx;
      if (!options.hasOwnProperty('getUser')) {
        await next();
      }
      let user = options.getUser(ctx);
      const useAnonymous = options.hasOwnProperty('useAnonymous') ? options.useAnonymous : false;
      if (!user && useAnonymous) {
        user = 'anonymous';
      }
      const authzorizer = await app.zrole.enforce(user, path, method);
      if (!authzorizer) {
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
