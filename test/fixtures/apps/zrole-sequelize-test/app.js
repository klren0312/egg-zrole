'use strict';

module.exports = app => {
  // init two policy, convenient to test
  app.ready(err => {
    if (err) throw err;
    app.zrole.addPolicy('xdd', '/', 'GET');
    app.zrole.addPolicy('xdd', '/remove', 'GET');
  });
};
