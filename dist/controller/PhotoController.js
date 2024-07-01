"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _nodefs = require('node:fs');
var _nodepath = require('node:path');
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Aluno = require('../model/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../model/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('photo');

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

      const aluno = await _Aluno2.default.findByPk(alunoId, { include: [_Photo2.default] });
      if (!aluno) {
        PhotoController.deleteInvalidFile(filename);
        return res.status(400).json({ error: 'Aluno não encontrado' });
      }
      if (aluno.Photo) {
        PhotoController.deleteInvalidFile(aluno.Photo.filename);
        await aluno.Photo.destroy();
      }

      const photo = await _Photo2.default.create({ originalname, filename, alunoId });

      return res.json(photo);
    });
  }

  static deleteInvalidFile(filename) {
    const absolutePath = _nodepath.resolve.call(void 0, 
      __dirname,
      '..',
      '..',
      'uploads',
      'img',
      filename,
    );
    _nodefs.unlink.call(void 0, absolutePath, (error) => {
      if (error) {
        console.log('Não foi possível excluir arquivo ', absolutePath);
      }
      console.log('Arquivo excluído!');
    });
  }
}

exports. default = new PhotoController();
