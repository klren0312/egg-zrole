'use strict';

module.exports = options => {
  return async (ctx, next) => {
    try {
      const { originalUrl: path, method } = ctx;
      const user = options.getUser(ctx);
      const authzorizer = ctx.app.zrole.enforce(user, path, method);
      if (!authzorizer) {
        ctx.status = 403;
      }
      await next();
    } catch (e) {
      throw e;
    }
  };
};
