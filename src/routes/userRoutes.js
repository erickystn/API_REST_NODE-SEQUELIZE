import { Router } from 'express';
import userController from '../controller/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const router = new Router();

// router.get('/', authMiddleware, userController.index);
router.get('/:id', userController.show);

router.post('/', userController.store);
router.put('/', authMiddleware, userController.update);
router.delete('/', authMiddleware, userController.destroy);

export default router;

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
