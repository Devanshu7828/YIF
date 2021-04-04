const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

function init(passport) {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_APP_ID,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: "https://yif-node-app.herokuapp.com/auth/linkedin/callback",
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      async function (accessToken, refreshToken, profile, done) {
        // CHECK EMAIL EXIST IN OUR DATABASE
        const { email } = profile.emails[0].value;
        const user = await User.findOne({ email: email });
        if (user) {
          const updateTOken = await User.findOneAndUpdate({
            tokens: accessToken,
          });
          return done(null, user);
        }
        // Create User
        const newUser = await new User({
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          tokens: accessToken,
        });

        await newUser.save();
        return done(null, newUser);
      }
    )
  );
}

module.exports = init;
