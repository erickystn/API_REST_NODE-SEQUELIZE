import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';

import photoController from '../controller/PhotoController';

const router = new Router();

router.post('/', authMiddleware, photoController.store);

export default router;
