'use strict';

module.exports = async (ctx, next) => {
  const { app, originalUrl: path, method, headers } = ctx;
  if (headers.authorization) {
    const authStr = headers.authorization;
    const authzorizer = await app.zrole.enforce(authStr, path, method);
    if (authzorizer) {
      next();
    } else {
      ctx.status = 403;
    }
  }
};
