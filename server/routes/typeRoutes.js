import express from "express";
import passport from 'passport'

// import { authorizeJwt } from "../middleware/auth.js";
import typeController from '../controller/typeController.js'

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.post("/create", typeController.create);

router.get("/getonebyname", typeController.getOneByName);


router.get("/getall", typeController.getAll);
router.get("/getallall", typeController.getAllall);
router.get("/findbyid/:id", typeController.findById);

router.post("/updatename/:id", typeController.updateName);
router.post("/updateall", typeController.updateAll);


router.delete("/delete/:id", typeController.deleteOne);

// router.post("/register", typeController.register);

// router.get("/logout", typeController.logout);


export default router;
