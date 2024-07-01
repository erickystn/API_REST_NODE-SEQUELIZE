"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Aluno = require('../model/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _User = require('../model/User'); var _User2 = _interopRequireDefault(_User);
var _Photo = require('../model/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

const models = [_Aluno2.default, _User2.default, _Photo2.default];
const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((model) => _optionalChain([model, 'access', _ => _.associate, 'optionalCall', _2 => _2(connection.models)]));
