import multer from 'multer';
import { extname, resolve } from 'path';

const randomNumber = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser JPG/JPEG ou PNG', file.fieldname));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'static', 'img'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomNumber()}${extname(file.originalname)}`);
    },
  }),
};
