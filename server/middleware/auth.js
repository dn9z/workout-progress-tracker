import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";

export async function authorizeJwt(req, res, next) {
  const authHeader = req.headers["authorization"];
  try {
    if (!authHeader) {
      throw new Error("No Auth Header!")
    }
    //remove "bearer" from string
    const token = authHeader.split(" ")[1]
    const authenticatedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(authenticatedToken.id);

    if (!user) {
      throw new Error("User does not exist!")
    }

    // mutation
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send("Token validation failed");
  }
}

// export function authAdminRole(req, res, next) {
//   if (req.user.role !== "admin") {
//     return res.status(401).send("You shall not pass!");
//   }

//   next();
// }
