import jwt from 'jsonwebtoken';
import User from '../model/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json({ errors: ['Email e/ou senha não enviado(s)'] });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ errors: ['Usuário não existe'] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: ['Senha inválida'] });
    }

    const { id, nome: nomeUser, email: emailUser } = user;
    const token = jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.json({ token, user: { id, nome: nomeUser, email: emailUser } });
  }
}

export default new TokenController();
