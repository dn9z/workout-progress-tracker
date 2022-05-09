import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import workoutRoutes from './routes/workoutRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 4000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);


app.all("*", (req, res) => {
  res.status(500);
  res.send("Invalid path");
});

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});
