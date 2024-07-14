import jwt from 'jsonwebtoken';
import User from '../model/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Token não fornecido'] });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('aquiii', jwt.verify(token, process.env.TOKEN_SECRET));

    const user = await User.findOne({ where: { id, email } });
    if (!user) {
      return res.status(401).json({ errors: ['Usuário Inválido'] });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({ errors: ['Token Inválido ou expirado'] });
  }
};
