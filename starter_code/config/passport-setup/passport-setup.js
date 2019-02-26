const passport      = require('passport');
const flash         = require("connect-flash");
const User          = require('../../models/user-model')

//require the local-strategy 
require('./local-strategy')
require('./google-strategy')

passport.serializeUser((user, cb) => {
  cb(null, user._id); // <== save user ID into session
})
 
 // deserializeUser => retrieve user's data from the database
passport.deserializeUser((userId, cb) => {
  User.findById(userId)
  .then(user => {
    cb(null, user);
  })
  .catch( err => cb(err));
})


function passportBasicSetup(app){//<=== This app comes from app.js
  app.use(passport.initialize()) //===>"Initialize session"
  app.use(passport.session()); //===> connect passport to the session

  
  //to activate flash messages
  app.use(flash())

  app.use((req, res, next) =>{
    res.locals.messages = req.flash(); 
    if(req.user){
      res.locals.currentUser = req.user;//===> Make currentUser available in all HBS
    }
    next();
  })

}

module.exports = passportBasicSetup;