'use strict';

const mock = require('egg-mock');

describe('test/zrole.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/zrole-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /, no permission', () => {
    return app.httpRequest()
      .get('/')
      .set('Authorization', 'js')
      .expect(403);
  });

  it('should GET /, has permission', () => {
    return app.httpRequest()
      .get('/')
      .set('Authorization', 'zzes')
      .expect('hi, zrole')
      .expect(200);
  });

  it('should GET /anonymous, is anonymous', () => {
    return app.httpRequest()
      .get('/anonymous')
      .expect('hi, anonymous')
      .expect(200);
  });
});

// describe('test sequlize', () => {
//   let app;
//   before(() => {
//     app = mock.app({
//       baseDir: 'apps/zrole-sequelize-test',
//     });
//     return app.ready();
//   });

//   after(() => app.close());
//   afterEach(mock.restore);

//   it('GET /, 200', () => {
//     return app.httpRequest()
//       .get('/')
//       .set('Authorization', 'xdd')
//       .expect('hi, zrole')
//       .expect(200);
//   });

//   it('remove policy', () => {
//     return app.httpRequest()
//       .get('/remove')
//       .set('Authorization', 'xdd')
//       .expect('remove successful')
//       .expect(200);
//   });

//   it('after remove, get 403', () => {
//     return app.httpRequest()
//       .get('/')
//       .set('Authorization', 'xdd')
//       .expect(403);
//   });

// });
