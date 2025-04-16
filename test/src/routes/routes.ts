import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello, TypeScript + Express!");
});
router.post('/users', (req, res) => {
    console.log(req.body);
    const response = { data: "oi" };
    res.send(response);
})

//routes.get('/user', UserController)

export default router;
