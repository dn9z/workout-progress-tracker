import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/authenticationHelper.js";

export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      registrationDate: new Date().toISOString(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //ADMIN,ACCOUNTANT
    // const roles = req.body.roles.split(",");

    // roles.forEach((role) => {
    //   user.roles.push(role);
    // });

    await user.save();

    return res.status(200).json({ message: "User Created" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong creating the user", error });
  }
};

export const login = async (req, res) => {
  //check if the user exists with that email / username
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    return res.status(404).json({ message: "User with that email was not found" });
  }

  try {
    const checkPassword = await bcrypt.compare(req.body.password, user.password);

    if (checkPassword) {
      //password is matching
      //Generate JWT token here
      const token = await generateToken(user);

      // send httpOnly 🍪
      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .json({
          message: "Login successful",
          // we are sending the user as an object with only selected keys
          user: { username: user.username }, // later I might want to send more keys here
          token
        });
    } else {
      return res.status(400).json({ message: "Passwords not matching" });
    }
  } catch (error) {
    console.log("the error ", error);
    return res.status(400).json({ message: "General error upon signing in." });
  }
};

export const logout = async (req, res) => {
  // Remove the httpOnly cookie
  console.log("I get here", req.cookies);
  console.log("user", req.user)
  res
    .clearCookie("jwt", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({ message: "Logout successful" }); // saying we want to send a JSON object
  //.redirect("/");
};

// exports.listUsers = async (req, res) => {
//   const page = Number(req.query.page) || 1;
//   const pageSize = Number(req.query.pageSize) || 10;

//   console.log("The user object ", req.user);
//   console.log("The cookies are: ", req.cookies);

//   //example page = 2 and pageSize = 3
//   // (2-1) = 1 * 3 = skip(3)
//   //example page = 3 and pageSize = 3
//   // (3-1) = 2 * 3 = skip(6)
//   //example page = 4 and pageSize = 3
//   // (4-1) = 3 * 3 = skip(9)
//   const skipRows = (page - 1) * pageSize; //calculating how many items to skip.

//   try {
//     const users = await User.find().skip(skipRows).limit(pageSize);

//     return res.status(200).json({ message: "list of users", users });
//   } catch (error) {
//     return res.status(400).json({ message: "Error happened" });
//   }
// };

// exports.profile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select(
//       "firstname lastname username email"
//     );

//     return res.status(200).json({ message: "User Info", user });
//   } catch (error) {
//     console.log("The error is ", error);

//     return res
//       .status(400)
//       .json({ message: "Something went wrong creating user", error: error });
//   }
// };

export default { register, login, logout };
