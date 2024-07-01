"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../model/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async index(req, res) {
    try {
      const users = await _User2.default.findAll();
      res.json({ success: true, users });
    } catch ({ errors }) {
      res.status(500).json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id, { attributes: ['id', 'nome', 'email'] });
      res.json({ success: true, user });
    } catch ({ errors }) {
      res.status(500).json(null);
    }
  }

  async store(req, res) {
    try {
      const user = await _User2.default.create(req.body);
      const { id, nome, email } = user;
      res.status(201).json({ success: true, user: { id, nome, email } });
    } catch ({ errors }) {
      res.status(400).json({ success: false, errors: errors.map((error) => error.message) });
    }
  }

  async update(req, res) {
    try {
      let user = await _User2.default.findByPk(req.userId);
      if (user) {
        user.update(req.body);
        const { id, nome, email } = user;
        user = { id, nome, email };
      }
      res.json({ success: true, user });
    } catch ({ errors }) {
      res.status(400).json({ success: false, errors: errors.map((error) => error.message) });
    }
  }

  async destroy(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      if (user) {
        user.destroy();
      }
      res.json({ success: true });
    } catch ({ errors }) {
      res.status(500).json(null);
    }
  }
}

exports. default = new UserController();
