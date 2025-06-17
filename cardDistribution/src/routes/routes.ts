import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/users', UserController.create);
router.post('/users/trade', UserController.update);
router.get('/users/:id/cards', UserController.show);

export default router;
