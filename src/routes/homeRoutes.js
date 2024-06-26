import { Router } from 'express';
import homeController from '../controller/HomeController';

const router = new Router();

router.get('/', homeController.index);

export default router;
