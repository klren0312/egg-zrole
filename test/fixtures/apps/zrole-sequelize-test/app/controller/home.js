'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  /**
   * test GET /
   */
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.zrole.name;
  }

  /**
   * remove xdd to get /
   */
  async remove() {
    this.ctx.app.zrole.removePolicy('xdd', '/', 'GET');
    this.ctx.body = 'remove successful';
  }
}

module.exports = HomeController;
