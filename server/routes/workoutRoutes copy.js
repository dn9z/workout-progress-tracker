import express from "express";
import Workout from "../models/Workout.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newWorkout = await Workout.create({
      date: req.body.date,
      notes: req.body.notes,
      type: {
        name: req.body.type.name,
        category: req.body.type.category,
      },
      data: {
        weights: req.body.data.weights,
        sets: req.body.data.sets,
        distance: req.body.data.distance,
        rounds: req.body.data.rounds,
      },
    });

    return res.status(201).json({ message: "Workout was created", createdWorkout: newWorkout });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error.toString() });
  }
});

router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  //example page = 2 & pageSize = 3
  //(2 -1) = 1 * 3 = skip(3)
  //example page = 3 & pageSize = 3
  //(3 -1) = 2 * 3 = skip(6)
  const skipRows = (page - 1) * pageSize;
  // populate will add the object instead of the object id to the key
  const workouts = await Workout.find();
  //No tea with such id
  if (!workouts) {
    return res.status(404).json("Workout not found");
  }

  //everything went ok (status code 200) and send the tea we found in the array.
  return res.status(200).json(workouts);
});

router.get("/find/:_id", async (req, res) => {
  const workout = await Workout.findById(req.params._id)
  if (!workout) {
    return res.status(404).json("Workout not found");
  }
  return res.status(200).json(workout);
});

router.get('/paginate', async(req, res) => {
  const searchQuery = req.query.searchQuery
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10
  const skipRows = (page - 1) * pageSize;
  
  // console.log('searchQuery:',searchQuery)

  let workouts = []
  if(searchQuery){
     workouts = await Workout.find({'type.name':searchQuery}).skip(skipRows).limit(pageSize)
  }
  if(!searchQuery){
     workouts = await Workout.find().skip(skipRows).limit(pageSize)
  }
  return res.status(200).json(workouts);

});


export default router;
