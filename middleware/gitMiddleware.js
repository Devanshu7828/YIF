
const passport = require('passport')

const gitMiddleware = passport.authenticate('github');
const gitLogin = passport.authenticate("github", {
    successRedirect: '/',
    successRedirect: '/login',
    failureFlash: true
});

module.exports={gitLogin,gitMiddleware};