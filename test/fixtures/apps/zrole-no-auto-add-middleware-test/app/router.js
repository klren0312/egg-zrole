'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.get('/middleware', middleware.checkRole, controller.home.hasMiddle);
};
