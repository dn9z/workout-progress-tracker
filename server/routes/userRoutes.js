import express from "express";
import passport from 'passport'
import upload from "../config/multer.js";

// import { authorizeJwt } from "../middleware/auth.js";

import userController from '../controller/userController.js'
const router = express.Router();

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/logout", userController.logout);
router.use(passport.authenticate("jwt", { session: false }));


router.post("/uploadavatar", upload.single("avatar"),userController.uploadAvatar);

router.get("/getavatar",userController.getAvatar);


// authorizeJwt middleware checks if token is valid
// router.use(passport.authenticate("jwt", { session: false }));

// modify the password for an existing user
// router.patch("/test", async (req, res) => {
//   // const { id } = req.params;

//   res.send("authorized action");
// });

export default router;
