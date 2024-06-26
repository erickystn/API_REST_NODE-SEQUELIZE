import Aluno from '../model/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'João',
      sobrenome: 'Silva',
      email: 'joao@email.com',
      idade: 20,
      peso: 80,
      altura: 1.80,
    });
    res.json({ success: true, novoAluno });
  }
}

export default new HomeController();
