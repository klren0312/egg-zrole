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
    await this.ctx.app.zrole.removePolicy('xdd', '/remove', 'GET');
    this.ctx.body = 'remove successful';
  }
}

module.exports = HomeController;
