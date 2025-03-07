import express from "express";
import * as UserControllers from "../controllers/users-controller";

const router = express.Router();

router.get("/", UserControllers.getAuthUser);

router.post("/signup", UserControllers.SignUp);

router.post("/login", UserControllers.LogIn);

router.get("/logout", UserControllers.Logout);

export default router;
