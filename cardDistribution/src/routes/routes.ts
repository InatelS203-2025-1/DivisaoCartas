import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post('/users', UserController.createUser)

//lilyan
router.get('/users/:id/cards', UserController.getUserCards);

export default router;
