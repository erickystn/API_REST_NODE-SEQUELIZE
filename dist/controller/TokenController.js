"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../model/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json({ errors: ['Email e/ou senha não enviado(s)'] });
    }
    const user = await _User2.default.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ errors: ['Usuário não existe'] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: ['Senha inválida'] });
    }

    const { id, nome: nomeUser, email: emailUser } = user;
    const token = _jsonwebtoken2.default.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.json({ token, user: { id, nome: nomeUser, email: emailUser } });
  }
}

exports. default = new TokenController();
