'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'no middleware';
  }

  async hasMiddle() {
    this.ctx.body = 'has middleware';
  }
}

module.exports = HomeController;
