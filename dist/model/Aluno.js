"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa conter de 3 a 254 caracteres',
          },
        },
      },
      sobrenome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Sobrenome precisa conter de 3 a 254 caracteres',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: { msg: 'E-mail já existe' },
        validate: { isEmail: { msg: 'Formato e-mail inválido' } },
      },
      idade: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: { isInt: { msg: ' Idade precisa ser um numero inteiro' } },
      },
      peso: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: { isFloat: { msg: ' Peso ser precisa um numero ' } },
      },
      altura: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: { isFloat: { msg: ' Altura ser precisa um numero ' } },
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasOne(models.Photo, { foreignKey: 'alunoId' });
  }
} exports.default = Aluno;
