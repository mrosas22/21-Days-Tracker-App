const express        = require('express');
const router         = express.Router();
// Require user model
const User           = require('../models/user-model');

//localhost:3000/fitness/one
router.get("/one", isLoggedIn, (req, res) => {
  res.render("exercise/fitness/day1", { user: req.user });
});

function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    res.redirect('/login');
  }

}

module.exports = router;