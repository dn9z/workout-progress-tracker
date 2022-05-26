import express from "express";
import passport from 'passport'

// import { authorizeJwt } from "../middleware/auth.js";
import workoutController from '../controller/workoutController.js'

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.post("/create/:typeid", workoutController.create);

router.get("/paginate", workoutController.paginate);

router.get("/chart", workoutController.chart);

router.get("/findbyid/:id", workoutController.findById);

router.delete("/deleteone/:id", workoutController.deleteOne);

router.patch("/update/:id", workoutController.update);

router.get("/getall", workoutController.getAll);


// router.delete("/delete/:name", workoutController.deleteOne);

// router.post("/register", typeController.register);

// router.get("/logout", typeController.logout);


export default router;
