'use strict';

module.exports = options => {
  return async (ctx, next) => {
    try {
      const { originalUrl: path, method } = ctx;
      let user = options.getUser(ctx);
      const useAnonymous = options.useAnonymous;
      if (!user && useAnonymous) {
        user = 'anonymous';
      }
      const authzorizer = await ctx.app.zrole.enforce(user, path, method);
      if (!authzorizer) {
        if (options.useCustomResponse) {
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
