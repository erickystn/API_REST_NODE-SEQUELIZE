"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../model/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../model/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'idade',
        ],
        include: { model: _Photo2.default, attributes: ['filename', 'url'] },
      });
      return res.json(alunos);
    } catch ({ errors }) {
      return res
        .status(400)
        .json({ errors: errors.map((error) => error.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'idade',
        ],
        include: { model: _Photo2.default, attributes: ['filename', 'url'] },
      });

      if (!aluno) {
        return res.status(400).json({ error: 'Aluno not found' });
      }

      return res.json(aluno);
    } catch ({ errors }) {
      return res
        .status(400)
        .json({ errors: errors.map((error) => error.message) });
    }
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      return res.status(201).json(aluno);
    } catch ({ errors }) {
      return res.status(400).json({
        errors: errors.map((error) => ({
          field: error.path,
          message: error.message,
        })),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Id is required' });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ error: 'Aluno not found' });
      }
      const alunoUpdated = await aluno.update(req.body);

      return res.json({ aluno: alunoUpdated });
    } catch ({ errors }) {
      return res.status(400).json({
        errors: errors.map((error) => ({
          field: error.path,
          message: error.message,
        })),
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Id is required' });
      }
      const aluno = await _Aluno2.default.findByPk(id);
      if (!aluno) {
        return res.status(400).json({ error: 'Aluno not found' });
      }
      await aluno.destroy();
      return res.json({ operation: 'register is deleted' });
    } catch ({ errors }) {
      return res
        .status(400)
        .json({ errors: errors.map((error) => error.message) });
    }
  }
}

exports. default = new AlunoController();
