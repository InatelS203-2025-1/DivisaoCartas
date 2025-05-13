import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send({ msg: 'ok' });
})
router.post('/users', UserController.createUser);

//Leticia
router.post('/users/trade', UserController.tradeCard);

//lilyan
router.get('/users/:id/cards', UserController.getUserCards);

export default router;
