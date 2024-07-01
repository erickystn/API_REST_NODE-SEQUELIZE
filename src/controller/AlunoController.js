import Aluno from '../model/Aluno';
import Photo from '../model/Photo';

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'idade',
        ],
        include: { model: Photo, attributes: ['filename', 'url'] },
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

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'idade',
        ],
        include: { model: Photo, attributes: ['filename', 'url'] },
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
      const aluno = await Aluno.create(req.body);
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

      const aluno = await Aluno.findByPk(id);

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
      const aluno = await Aluno.findByPk(id);
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

export default new AlunoController();
