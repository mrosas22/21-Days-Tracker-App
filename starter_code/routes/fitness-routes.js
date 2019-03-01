const express        = require('express');
const router         = express.Router();
// Require mongoose model
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');
const Routine        = require('../models/routine-model');

//
router.get("/:id", ensureAuthenticated, (req, res) => {
  Plan.findById(req.params.id)
    .then(plan =>{
      res.render("plans/plan-details", {plan});
    })
    .catch(err => console.log('Error while finding the plan: ', err));
  
})
//localhost:3000/fitness/5c7703ead9ff79e3f02e7fb8  ++++++++++++++++++++++++
router.get("/:planId/one", ensureAuthenticated, (req, res) => {  
  const planId = req.params.planId;  
  // console.log('este: ', planId);
  res.render("routine/fitness/day1", { user: req.user, planId });   ///routine/fitness/day1
});

// User update routine
//localhost:3000/fitness/5c75b1ab33b63d96ff79050a/create
router.post("/:planId/create", ensureAuthenticated, (req, res) =>{
  const newRoutine = {
    water   : req.body.water,
    calories: req.body.calories,
    sleep   : req.body.sleep,
    exercise: req.body.exercise,
    member  : req.user._id
    }
  // console.log(' we are to see: ', req.body );
  Routine.create(newRoutine)
    .then(thenewRoutine =>{
      User.findById(req.user._id)
      .then(foundUser =>{
        foundUser.routines.push(thenewRoutine._id);
        foundUser.save()
          .then(() => {
            res.redirect(`/fitness/${req.params.planId}/one`);
            // res.redirect('/user/profile')
          })
          .catch(err => console.log('Error while saving the user: ', err));
      })
      .catch(err => console.log('Error while saving the user: ', err));
    })
    .catch(err => console.log('Error while saving the user: ', err));
})
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}


module.exports = router;