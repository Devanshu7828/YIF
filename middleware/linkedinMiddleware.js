const passport = require("passport");

const linkedinMiddleware = passport.authenticate("linkedin", {
  scope: ["r_emailaddress", "r_liteprofile"],
});

const linkedinLogin = passport.authenticate("linkedin", {
  successRedirect: "/",
  failureRedirect: "/form",
});

module.exports = {
  linkedinLogin,
  linkedinMiddleware,
};
