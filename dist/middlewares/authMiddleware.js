"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../model/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Token not provided'] });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id, email } = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);

    const user = await _User2.default.findOne({ where: { id, email } });
    if (!user) {
      return res.status(401).json({ errors: ['User invalid'] });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({ errors: ['Token invalid or expired'] });
  }
};
