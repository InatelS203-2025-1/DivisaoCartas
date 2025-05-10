import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

// router.get("/user/cards", UserController.getCards);
router.get("/user/:id", UserController.getUserInfo);

router.post('/users', (req, res) => {
    const response = { data: "oi" };
    res.send(response);
})


//routes.get('/user', UserController)

export default router;
