"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
  async index(req, res) {
    res.json(`index ${req.originalUrl}`);
  }
}

exports. default = new HomeController();
