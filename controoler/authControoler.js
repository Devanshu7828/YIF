const User = require("../models/userModel.js");
const passport = require("passport");
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  // VALIDATE REQUEST
  if (!email || !password || !name) {
    req.flash("error", "All fields are required");
    req.flash("name", name);
    req.flash("email", email);
    return res.redirect("/form");
  }
  // CHECK IF EMAIL EXIST IN OUR DATABASE
  User.exists({ email: email }, async (err, result) => {
    if (result) {
      req.flash("error", "Email already exists"), req.flash("name", name);
      req.flash("email", email);
      return res.redirect("/form");
    }

    //   CREATE USER AND SAVE IN DATABASE
    const user = new User({
      name,
      email,
      password,
    });
    await user
      .save()
      .then((user) => {
        req.flash("registerSuccess", "Register successfully!");
        return res.redirect("/form");
      })
      .catch((err) => {
        req.flash("error", "Something Went Wrong");
        return res.redirect("/form");
      });
  });
};

const loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      req.flash("error", info.message);
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);

      return res.redirect("/form");
    }

    req.login(user, (err) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }

      return res.redirect("/");
    });
  })(req, res, next);
};

const logoutUser = async (req, res) => {
  req.logout();
  return res.redirect("/");
};

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

module.exports = { registerUser, loginUser, logoutUser, googleAuth };
