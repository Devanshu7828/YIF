const User = require("../models/userModel");
const passport = require("passport");

const fbMidleware = passport.authenticate('facebook');


const fbLogin = passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/login",
});
module.exports = {fbLogin,fbMidleware};
