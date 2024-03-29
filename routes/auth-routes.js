const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
  res.render('login', {user: req.user});
})

//auth logout
router.get('/logout', (req, res) => {
  //handle with Passport.js
  req.logout();
  res.redirect('/')

})

//auth with google
router.get('/google', passport.authenticate('google', {
  scope:['profile', 'email']
}));

//callback route for google redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  //res.send(req.user)
  res.redirect('http://localhost:3000/profile/')//added localhost:3000

})

router.get('/test', (req, res) => {
  console.log('test hit')
})

module.exports = router;
