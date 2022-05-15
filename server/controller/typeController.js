import Type from "../models/Type.js";

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
  try {
    const type = await Type.findOne({ _user: req.user._id, name: req.body.typeName });
    return res.status(200).json({ type });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const types = await Type.find({ _user: req.user._id }).select("name");
    return res.status(200).json({ types });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const deleteOne = async (req, res) => {
  const typeId = await Type.findOne({ name: req.params.name });
  try {
    const type = await Type.findByIdAndDelete(typeId._id);
    return res.status(200).json({ message: "deleted", type });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export const getAllall = async (req, res) => {
  try {
    const types = await Type.find({ }).populate('_user');
    return res.status(200).json({ types });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
};

export default { create, getOneByName, getAll,getAllall, deleteOne };
