const GoogleStatergy = require("passport-google-oauth2").Strategy;
const User = require("../models/userModel");

function init(passport) {
  passport.use(
    new GoogleStatergy(
      {
        clientID: process.env.GOOGLEAPPID,
        clientSecret: process.env.GOOGLESECRET,
        callbackURL: "https://yif-node-app.herokuapp.com/google/auth/callback",
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        // // check if email exist in db
        const { email, name } = profile;
        console.log(refreshToken);
        //CHECK IF USER EXIST IN DATABASE
        const user = await User.findOne({ email: email });
        if (user) {
          const updateTOken = await User.findOneAndUpdate({
            tokens: accessToken,
          });

          return done(null, user);
        }
        const newUser = await User({
          id: profile.id,
          email,
          name: profile.name.givenName + " " + profile.name.familyName,
          pic: profile.picture,
          tokens: accessToken,
        });
        await newUser.save();
        return done(null, newUser);
      }
    )
  );
  // This method store user id in session after sucessfully logged in
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
