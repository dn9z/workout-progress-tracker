import Type from "../models/Type.js";
import Workout from "../models/Workout.js";

export const create = async (req, res) => {
  try {
    // console.log(req.user)
    // console.log("I get here", req.cookies);

    const newType = await Type.create({
      name: req.body.name,
      category: req.body.category,
      _user: req.user._id,
    });

    return res.status(200).json({ message: "Type was created", createdType: newType });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const getOneByName = async (req, res) => {
  const typeName = req.query.name;
  try {
    const type = await Type.findOne({ _user: req.user._id, name: typeName });
    return res.status(200).json({ type });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const types = await Type.find({ _user: req.user._id });
    return res.status(200).json({ types });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const deleteOne = async (req, res) => {
  const id = req.params.id;
  try {
    const type = await Type.findByIdAndDelete(id);
    const workouts = await Workout.deleteMany({ _user: req.user._id, _type: id });
    return res.status(200).json({ message: "deleted", type });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

// export const getAllall = async (req, res) => {
//   try {
//     const types = await Type.find({}).populate("_user");
//     return res.status(200).json({ types });
//   } catch (error) {
//     return res.status(400).json({ message: "Error happened", error: error });
//   }
// };

export const updateName = async (req, res) => {
  const id = req.params.id;
  const newName = req.body.newName;
  try {
    const type = await Type.findByIdAndUpdate(id, { name: newName });
    return res.status(200).json({ type });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const updateAll = async (req, res) => {
  const newList = req.body.newList;
  try {
    await Type.deleteMany({_user: req.user._id});

    for (let i = 0; i < newList.length; i++) {
      await Type.create({
        _id: newList[i]._id,
        _user: req.user._id,
        name: newList[i].name,
        category: newList[i].category,
      });
    }
    return res.status(200).json({ newList });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const findById = async (req, res) => {
  const id = req.params.id;
  try {
    const type = await Type.findById(id);
    return res.status(200).json({ type });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export default {
  create,
  getOneByName,
  getAll,
  findById,
  updateName,
  updateAll,
  deleteOne,
};
