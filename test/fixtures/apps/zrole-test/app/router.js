'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;

  router.get('/', controller.home.index);

  router.get('/anonymous', controller.home.anonymous);

  router.get('/middle', middleware.testNext, controller.home.middle);
};
