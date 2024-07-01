import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../model/Aluno';
import User from '../model/User';
import Photo from '../model/Photo';

const models = [Aluno, User, Photo];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate?.(connection.models));
