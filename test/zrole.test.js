'use strict';

const mock = require('egg-mock');

// describe('test/zrole.test.js', () => {
//   let app;
//   before(() => {
//     app = mock.app({
//       baseDir: 'apps/zrole-test',
//     });
//     return app.ready();
//   });

//   after(() => app.close());
//   afterEach(mock.restore);

//   it('should GET /', () => {
//     return app.httpRequest()
//       .get('/')
//       .set('Authorization', 'js')
//       .expect('hi, zrole')
//       .expect(403);
//   });

//   it('should GET /', () => {
//     return app.httpRequest()
//       .get('/')
//       .set('Authorization', 'zzes')
//       .expect('hi, zrole')
//       .expect(200);
//   });
// });

describe('test sequlize', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/zrole-sequelize-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .set('Authorization', 'xdd')
      .expect('hi, zrole')
      .expect(200);
  });

});
