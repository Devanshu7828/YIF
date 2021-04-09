const passport = require("passport");

const googleMiddleware = passport.authenticate("google", {scope:['email','profile']
});

const googleLogin= passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
module.exports = {googleMiddleware,googleLogin};
