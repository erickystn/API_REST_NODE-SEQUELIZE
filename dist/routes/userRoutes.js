"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controller/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _authMiddleware = require('../middlewares/authMiddleware'); var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

const router = new (0, _express.Router)();

// router.get('/', authMiddleware, userController.index);
router.get('/:id', _UserController2.default.show);

router.post('/', _UserController2.default.store);
router.put('/', _authMiddleware2.default, _UserController2.default.update);
router.delete('/', _authMiddleware2.default, _UserController2.default.destroy);

exports. default = router;

/*
Metodos Padrões do mercado

index -> todos os usuarios -> GET
show -> mostrar um usuario -> GET
create -> MVC -> pagina de criação do usuario -> GET
store/create -> cadastrar um novo usuario -> POST
edit -> MVC -> pagina de edição de usuario -> GET
update -> atualizar um usuario -> PATCH ou PUT
destroy -> deletar um usuario -> DELETE
*/
