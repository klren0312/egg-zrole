'use strict';

const mock = require('egg-mock');

describe('test/zrole.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/zrole-no-auto-add-middleware-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /, no middleware', () => {
    return app.httpRequest()
      .get('/')
      .expect('no middleware')
      .expect(200);
  });

  it('should GET /middleware, has middleware, no permission', () => {
    return app.httpRequest()
      .get('/middleware')
      .set('Authorization', 'noAuth')
      .expect(403);
  });

  it('should GET /middleware, has middleware, has permission', () => {
    return app.httpRequest()
      .get('/middleware')
      .set('Authorization', 'hasAuth')
      .expect('has middleware')
      .expect(200);
  });
});

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
      .expect('Your do not has permission to access')
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

  it('should GET /middle, test middleware next', () => {
    return app.httpRequest()
      .get('/middle')
      .set('Authorization', 'jk')
      .expect('Your do not has permission to access')
      .expect(403);
  });

  it('should GET /, test multi roles, has one role that can access', () => {
    return app.httpRequest()
      .get('/')
      .set('Authorization', '["jk", "zzes"]')
      .expect('hi, zrole')
      .expect(200);
  });

  it('should GET /, test multi roles, both roles can not access', () => {
    return app.httpRequest()
      .get('/')
      .set('Authorization', '["jk", "ts"]')
      .expect('Your do not has permission to access')
      .expect(403);
  });

  it('should GET /, test custom set superManage, it will jump the role check', () => {
    return app.httpRequest()
      .get('/')
      .set('Authorization', '["admin", "ts"]')
      .expect('hi, zrole')
      .expect(200);
  });
});

describe('test sequlize', async () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/zrole-sequelize-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('GET /, 200', () => {
    return app.httpRequest()
      .get('/')
      .set('Authorization', 'xdd')
      .expect('hi, zrole')
      .expect(200);
  });

  it('remove policy', () => {
    return app.httpRequest()
      .get('/remove')
      .set('Authorization', 'xdd')
      .expect('remove successful')
      .expect(200);
  });

  it('after remove, get 403', () => {
    return app.httpRequest()
      .get('/remove')
      .set('Authorization', 'xdd')
      .expect(403);
  });
});
