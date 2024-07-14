import Sequelize, { Model } from 'sequelize';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo de nome obrigatório',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nome arquivo obrigatório',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${process.env.APP_URL}/img/${this.filename}`;
        },
      },
    }, { sequelize, tableName: 'fotos', underscored: false });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'alunoId' });
  }
}
