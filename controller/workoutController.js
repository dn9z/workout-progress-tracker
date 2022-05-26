import Workout from "../models/Workout.js";
import Type from "../models/Type.js";
import { startOfDay, endOfDay } from "date-fns";

export const create = async (req, res) => {
  try {
    // console.log(req.params.typeid);
    // console.log("I get here", req.cookies);

    const newWorkout = await Workout.create({
      _user: req.user._id,
      _type: req.params.typeid,
      date: req.body.date,
      category: req.body.category,
      data: req.body.data,
      note: req.body.note,
    });

    return res.status(200).json({ message: "Workout was created", createdWorkout: newWorkout });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error.message });
  }
};

export const paginate = async (req, res) => {
  // console.log('test')
  const searchQuery = req.query.searchquery;
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const skipRows = (page - 1) * pageSize;

  try {
    let workouts = [];
    if (searchQuery) {
      const type = await Type.findOne({ _user: req.user._id, name: searchQuery }).select("_id");
      // console.log(type._id)

      workouts = await Workout.find({ _user: req.user._id, _type: type._id })
        .populate("_type")
        .sort({ date: -1 })
        .skip(skipRows)
        .limit(pageSize);
    }
    if (!searchQuery) {
      workouts = await Workout.find({ _user: req.user._id })
        .populate("_type")
        .sort({ date: -1 })
        .skip(skipRows)
        .limit(pageSize);
    }
    // console.log(workouts);
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error.message });
  }
};

export const chart = async (req, res) => {
  const searchQuery = req.query.searchquery;
  const from = req.query.from;
  const to = req.query.to;

  try {
    let workouts = [];
    if (searchQuery) {
      const type = await Type.findOne({ _user: req.user._id,name: searchQuery }).select("_id");
      workouts = await Workout.find({
        _user: req.user._id,
        _type: type._id,
        date: {
          $gte: new Date(from),
          $lte: new Date(to),
        },
      })
        .populate("_type")
        .sort({ date: 1 });
    }
    if (!searchQuery) {
      const types = await Type.findOne({_user: req.user._id}).select("_id");
      workouts = await Workout.find({
        _user: req.user._id,
        _type: types._id,
        date: {
          $gte: new Date(from),
          $lt: new Date(to),
        },
      }).sort({ date: 1 }); // will be removed at later stage
    }
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate("_type");
    return res.status(200).json({ workout });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    const workout = await Workout.findByIdAndDelete(id);
    return res.status(200).json({ message: "deleted", workout });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error.message });
  }
};

export const update = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  console.log(new Date(Date.parse(req.body.date)));
  try {
    let workout = {};
    if (req.body.type === "weights") {
      workout = await Workout.findByIdAndUpdate(id, {
        date: new Date(Date.parse(req.body.date)),
        "data.weights": Number(req.body.data.weights),
        "data.sets": req.body.data.sets,
        note: req.body.note,
      });
    } else if (req.body.type === "bodyweight") {
      workout = await Workout.findByIdAndUpdate(id, {
        date: new Date(Date.parse(req.body.date)),
        "data.sets": req.body.data.sets,
        note: req.body.note,
      });
    } else if (req.body.type === "distance") {
      workout = await Workout.findByIdAndUpdate(id, {
        date: new Date(Date.parse(req.body.date)),
        "data.distance": req.body.data.distance,
        "data.rounds": req.body.data.rounds,
        note: req.body.note,
      });
    }

    return res.status(200).json(workout);
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const workouts = await Workout.find({ _user: req.user._id })
      .populate("_type")
      .sort({ date: 1 });
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error.message });
  }
};
// export const getOneByName = async (req, res) => {
//   try {
//     const type = await Workout.findOne({ _user: req.user._id, name: req.body.typeName });
//     return res.status(200).json({ type });
//   } catch (error) {
//     return res.status(400).json({ message: "Error happened", error: error });
//   }
// };

// export const deleteOne = async (req, res) => {
//   const typeId = await Workout.findOne({ name: req.params.name });
//   try {
//     const type = await Workout.findByIdAndDelete(typeId._id);
//     return res.status(200).json({ message: "deleted", type });
//   } catch (error) {
//     return res.status(400).json({ message: "Error happened", error: error });
//   }
// };

// export const paginate = async (req, res) => {
//   // console.log('test')
//   const searchQuery = req.query.searchquery;
//   const page = Number(req.query.page) || 1;
//   const pageSize = Number(req.query.pageSize) || 10;
//   const skipRows = (page - 1) * pageSize;

//   try {
//     let workouts = [];
//     if (searchQuery) {
//       workouts = await Workout.find()
//       .skip(skipRows)
//         .populate([
//           "_user",
//           {
//             path: "_type",
//             match: { name: searchQuery },
//           },
//         ])

//         .exec()

//           workouts = workouts.filter((user) => {
//           return user._type;
//           })

//     }
//     if (!searchQuery) {
//       workouts = await Workout.find().populate(["_user", "_type"]).skip(skipRows).limit(pageSize);
//     }
//     // console.log(workouts);
//     return res.status(200).json(workouts);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: "Error happened", error: error });
//   }
// };

export default { create, paginate, chart, findById, deleteOne, update, getAll };
