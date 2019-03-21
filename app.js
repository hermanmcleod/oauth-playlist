const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');

const app = express();

//setup view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 *1000,
  keys: [keys.session.cookieKey]
}));

//morgan logging
app.use(morgan('tiny'))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongoDB.dbURI, {useNewUrlParser: true}, () => {
  console.log('connected to mongoDB')
})

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/', (req, res) => {
  res.render('home', {user: req.user});
})


const PORT = 4000;
app.listen(PORT, ()=>{
  console.log(`App now listening on port: ${PORT}`)
})
