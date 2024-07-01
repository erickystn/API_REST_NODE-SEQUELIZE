import jwt from 'jsonwebtoken';
import User from '../model/User';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Token not provided'] });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = User.findOne({ where: { id, email } });
    if (!user) {
      return res.status(401).json({ errors: ['User invalid'] });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({ errors: ['Token invalid or expired'] });
  }
};
