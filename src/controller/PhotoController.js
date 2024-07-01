import multer from 'multer';
import { unlink } from 'node:fs';
import { resolve } from 'node:path';
import multerConfig from '../config/multerConfig';
import Aluno from '../model/Aluno';
import Photo from '../model/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [
            {
              field: err.field,
              message: err.code,
            },
          ],
        });
      }

      const { alunoId } = req.body;
      const { originalname, filename } = req.file;

      if (!alunoId) {
        PhotoController.deleteInvalidFile(filename);
        return res.status(400).json({ error: 'Aluno não informado' });
      }

      const aluno = await Aluno.findByPk(alunoId, { include: [Photo] });
      if (!aluno) {
        PhotoController.deleteInvalidFile(filename);
        return res.status(400).json({ error: 'Aluno não encontrado' });
      }
      if (aluno.Photo) {
        PhotoController.deleteInvalidFile(aluno.Photo.filename);
        await aluno.Photo.destroy();
      }

      const photo = await Photo.create({ originalname, filename, alunoId });

      return res.json(photo);
    });
  }

  static deleteInvalidFile(filename) {
    const absolutePath = resolve(
      __dirname,
      '..',
      '..',
      'uploads',
      'img',
      filename,
    );
    unlink(absolutePath, (error) => {
      if (error) {
        console.log('Não foi possível excluir arquivo ', absolutePath);
      }
      console.log('Arquivo excluído!');
    });
  }
}

export default new PhotoController();
