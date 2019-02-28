const express        = require('express');
const router         = express.Router();
// Require user model
const User           = require('../models/user-model');

//localhost:3000/fitness/one
router.get("/one", isLoggedIn, (req, res) => {
  res.render("routine/fitness/day1", { user: req.user });
});

// User update routine
//localhost:3000/fitness/5c75b1ab33b63d96ff79050a/create
router.post("/:userId/create", isLoggedIn, (req, res) =>{
  const newRoutine = {
    water: req.body.water,
    calories: req.body.calories,
    sleep: req.body.sleep,
    exercise: req.body.exercise,
    member: req.user._id
    }
  // console.log(' we are to see: ', req.body );
  Routine.create(newRoutine)
    .then(thenewRoutine =>{
      User.findById(req.params.userId)
      .then(foundUser =>{
        foundUser.routines.push(thenewRoutine._id);
        foundUser.save()
        .then(() => {
          res.redirect('/fitness/one')
        })
        .catch(err => console.log('Error while saving the user: ', err));
      })
      .catch(err => console.log('Error while saving the user: ', err));
    })
    .catch(err => console.log('Error while saving the user: ', err));
})


function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    res.redirect('/login');
  }

}

module.exports = router;