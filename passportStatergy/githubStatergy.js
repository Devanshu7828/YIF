const githubStatergy = require("passport-github").Strategy;
const User = require("../models/userModel");

function init(passport) {
  passport.use(
    new githubStatergy(
      {
        clientID: process.env.gitAPPID,
        clientSecret: process.env.gitclientID,
        callbackURL: "https://yif-node-app.herokuapp.com/git/auth/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
      
          
        //   CHECK IF ID EXIST IN DB
          const user = await User.findOne({ id: profile.id });
          if (user) {
            const updateTOken = await User.findOneAndUpdate({
              tokens: accessToken,
            });
            return done(null, user);
          }
          // Create a user
          const newUser = await User({
            id: profile.id,
            name: profile.username,
            pic: profile.photos[0].value,
            tokens: accessToken,
          });
          await newUser.save();
          return done(null, newUser);
      }
    )
  );
}


module.exports = init;