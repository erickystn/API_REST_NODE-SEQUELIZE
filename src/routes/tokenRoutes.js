import { Router } from 'express';
import tokenController from '../controller/TokenController';

const router = new Router();

router.post('/', tokenController.store);

export default router;
