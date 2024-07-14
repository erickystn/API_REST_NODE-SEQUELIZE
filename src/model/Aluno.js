import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa conter de 3 a 254 caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Sobrenome precisa ter de 3 a 254 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: { msg: 'E-mail já existe' },
        validate: { isEmail: { msg: 'Formato e-mail inválido' } },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: { isInt: { msg: ' Idade precisa ser um numero inteiro' } },
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: { isFloat: { msg: ' Peso ser precisa um numero ' } },
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: { isFloat: { msg: ' Altura ser precisa um numero ' } },
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasOne(models.Photo, { foreignKey: 'alunoId' });
  }
}
