import Workout from "../models/Workout.js";
import Type from "../models/Type.js";

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
    return res.status(400).json({ message: "Error happened", error: error });
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
      const type = await Type.findOne({name:searchQuery}).select('_id')
      // console.log(type._id)

      workouts = await Workout.find({_type:type._id}).populate("_type").skip(skipRows).limit(pageSize)
      // console.log(workouts)
      // workouts = await Workout.find()
      //   .populate([
      //     "_user",
      //     {
      //       path: "_type",
      //       match: { name: searchQuery },
      //     },
      //   ])
      //   .exec((err, data) => {
      //     if (err) console.log(err)
      //     const filtered = data.filter((ele) => {
      //       return ele._type;
      //     });
      //     console.log(filtered)
      //   })
      //   .skip(skipRows)
      //   .limit(pageSize);
    }
    if (!searchQuery) {
      workouts = await Workout.find().populate("_type").skip(skipRows).limit(pageSize);
    }
    // console.log(workouts);
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const chart = async (req, res) => {
  try {
    const workouts = await Workout.find().populate('_type');
    if (!workouts) {
      return res.status(404).json("Workout not found");
    }
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
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

// export const getAll = async (req, res) => {
//   try {
//     const types = await Workout.find({ _user: req.user._id }).select("name");
//     return res.status(200).json({ types });
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

export default { create, paginate, chart };
