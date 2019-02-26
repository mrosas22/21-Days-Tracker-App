const express        = require('express');
const router         = express.Router();
// Passport to manage sessions
const passport       = require('passport')
// Require user model
const User           = require('../models/user-model')
//bcryptjs to encrypt passwords
const bcrypt         = require('bcryptjs')
const bcryptSalt     = 10;

router.get('/signup', (req, res) => {
  res.render('auth/signup', { user: req.user });
});

router.post('/signup', (req, res, next) =>{
  const {fullName, email, password} = req.body
  if( email == ""|| password == "" || fullName == ""){
    req.flash ('error', ' Please fill all the fields.')
    res.render('auth/signup');
    return;
  }
  User.findOne({'email': email})
    .then(foundUser =>{
      if(foundUser !== null){
        req.flash('error', "There's already an user with the email. Please try again")
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt)
      User.create({
        email: email,
        password: hashPass,
        fullName: fullName
      })
        .then(user =>{
          req.login(user, (err)=>{
            if(err){
              req.flash('error', 'Auto login does not work. Please login manually')
              res.redirect('/');
              return;
            }
            res.redirect('/user/profile')
          })
        })
        .catch(err => next(err));//closing User.create()
    })
    .catch(err => next(err));
})

router.get('/login', (req, res, next) =>{
  res.render('auth/login')
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/user/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//========================LOGOUT=======
router.post("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
})


//////////////// GOOGLE LOGIN /////////////////////
router.get("/google-login", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "/user/profile",
  successMessage: 'Google login successful!',
  failureRedirect: "/login",
  failureMessage: 'Google login failed. Please try to login manually.'
}));

module.exports = router;