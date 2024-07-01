import { Router } from 'express';
import alunoController from '../controller/AlunoController';

const router = new Router();

router.get('/', alunoController.index);
router.get('/:id', alunoController.show);
router.post('/', alunoController.store);
router.put('/:id', alunoController.update);
router.delete('/:id', alunoController.destroy);

export default router;
