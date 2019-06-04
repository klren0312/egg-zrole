'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.app.zrole.addPolicy('xdd', '/', 'GET');
    this.ctx.body = 'hi, ' + this.app.plugins.zrole.name;
  }
}

module.exports = HomeController;
