const LocalStatergy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/userModel");

function init(passport) {
  passport.use(
    new LocalStatergy(
      { usernameField: "email" },
      async (email, password, done) => {
        // Login
        // Check if email exist in db

        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, {
            message: "No User Found",
          });
        }

        const isvalid = await user.validPassword(password);

        if (isvalid) {
          // const token = await user.generateToken();
          return done(null, user, { message: "Logged in succesfully" });
        } else {
          return done(null, false, { message: "Wrong Details" });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    // when we do req.user we get login user the user
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
