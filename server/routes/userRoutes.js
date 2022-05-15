import express from "express";
import passport from 'passport'
// import { authorizeJwt } from "../middleware/auth.js";

import userController from '../controller/userController.js'
const router = express.Router();

router.post("/login", userController.login);

router.post("/register", userController.register);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/logout", userController.logout);

// authorizeJwt middleware checks if token is valid
// router.use(passport.authenticate("jwt", { session: false }));

// modify the password for an existing user
// router.patch("/test", async (req, res) => {
//   // const { id } = req.params;

//   res.send("authorized action");
// });

export default router;
