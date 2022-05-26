import User from "../models/User.js";
import passportJWT from "passport-jwt";
const JWTStrategy = passportJWT.Strategy;

function configureJwtStrategy(passport) {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: (req) => {
          return req.cookies["jwt"];
        }, // we tell JWTStrategy where to find the token
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      },
      (jwtPayload, done) => {
        return (
          User.findById(jwtPayload.sub)
            // performance improvement, not necessary
            .select("_id username email")
            .then((user) => {
              return done(null, user);
            })
            .catch((err) => {
              return done(err);
            })
        );
      }
    )
  );
}
export default configureJwtStrategy;


// import User from "./models/User.js";
// import passportJWT from "passport-jwt";

// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

// const configureJwtStrategy = (passport) => {
//   passport.use(
//     "jwt",
//     new JWTStrategy(
//       {
//         // jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
//         jwtFromRequest: (req) => {
//           return req.cookies["jwt"];
//         },
//         secretOrKey: process.env.ACCESS_TOKEN_SECRET,
//       },
//       (jwtPayload, done) => {
//         return User.findById(jwtPayload.sub)
//           .select("_id registrationDate username email")
//           .then((user) => {
//             return done(null, user);
//           })
//           .catch((err) => {
//             return done(err);
//           });
//       }
//     )
//   );
// };

// export default configureJwtStrategy;
