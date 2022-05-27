import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import workoutRoutes from "./routes/workoutRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import typeRoutes from "./routes/typeRoutes.js";
import passport from "passport";
// import path from 'path'clear
import configurePassport from "./config/passport-config.js";
// import { fileURLToPath } from "url";
// import path, { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

import {fileURLToPath} from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
console.log("filename is", __filename);
const __dirname = dirname(__filename);
console.log("directoryname is", __dirname);

dotenv.config();
const app = express();
console.log('env port is',process.env.PORT)
// const PORT = process.env.PORT || 3001
app.set("port", process.env.PORT || 4000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

//initialize passport
app.use(cookieParser());
app.use(passport.initialize());
//configure passport using our function.
configurePassport(passport);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("we are connected to the database.");
  })
  .catch((error) => {
    console.log("an error occurred while connecting to the db", error);
  });

app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/types", typeRoutes);






app.use(express.static(path.join(__dirname, "client/build")));
// * is the wildcard, anything else that's no matching a route above this.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// app.use("/uploads", express.static("uploads"));


// app.all("*", (req, res) => {
//   res.status(500);
//   res.send("Invalid path");
// });

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});
