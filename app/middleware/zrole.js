'use strict';

module.exports = options => {
  return async (ctx, next) => {
    try {
      const { originalUrl: path, method } = ctx;
      const user = options.getUser(ctx);
      const e = await ctx.app.zrole;
      const authzorizer = e.enforce(user, path, method);
      if (!authzorizer) {
        ctx.status = 403;
      }
      await next();
    } catch (e) {
      throw e;
    }
  };
};
