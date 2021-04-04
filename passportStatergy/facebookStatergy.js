const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModel");

function init(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FBAPPID,
        clientSecret: process.env.FBAPPSECRET,
        callbackURL: "https://yif-node-app.herokuapp.com/fb/auth",
        profileFields: [
          "id",
          "displayName",
          "name",
          "gender",
          "email",
          "picture.type(large)",
        ],
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
          name: profile.displayName,
          email: profile.email,
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
