const { user } = require("../database/database");

function guest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/");
}

function guestUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/auth/login");
}

module.exports = { guest, guestUser };
