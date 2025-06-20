import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/users', UserController.create);
router.get('/users', UserController.index);
router.post('/users/trade', UserController.registerTrade);
router.get('/users/:id/cards', UserController.show);

export default router;
