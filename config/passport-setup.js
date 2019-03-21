const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })

});

passport.use(
  new GoogleStrategy({
    //options for Google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done) => {
  //check if user already exists in database
  console.log(profile);
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if(currentUser){
      //user already exists
      console.log(`user is: ${currentUser}`)
      done(null, currentUser);
    } else {
      //create new user in DB
      new User({
      username: profile.displayName,
      googleId: profile.id,
      thumbnail: profile._json.picture
    }).save().then((newUser) => {
      console.log(`New user created: ${newUser}`);
      done(null, newUser);
    });
    }

  })


})
)
