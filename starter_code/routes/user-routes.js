const express        = require('express');
const router         = express.Router();
// Require user model
const User           = require('../models/user-model');
const Plan           = require('../models/plan-model');

//Route for user's profile =====> /localhost:3000/profile
// router.get("/profile", ensureAuthenticated, (req, res) => {
//   res.render("user/user-profile", { user: req.user });
// });

//List all plans created by admins ======>localhost:3000/plans
router.get('/profile', ensureAuthenticated, (req, res, next) =>{
  User.findById(req.user._id)
    .then((user) =>{
      const isIncluded = user.plan.includes(req.user.plan);
      console.log('The included plan is: ', isIncluded)
      console.log('The current user plan is: ', user.plan)
      if(req.user.plan && isIncluded){
        user.plan.isMember = true;
      }
      res.render('user/user-profile', {user});
    })
    .catch((error) =>{
      console.log(error)
    })
})

//Admin profile page to create plans
router.get('/admin', checkRoles('ADMIN'), (req, res) => {
  res.render('user/user-admin', {admin: req.user});
});

//Route for only admins to manage users =====> /user/manage
router.get('/manage', checkRoles('ADMIN'), (req, res) => {
  User.find()
    .then((users) =>{
      res.render('user/user-manage', {users});
    })
    .catch((error) =>{
      console.log(error)
    })
  
});

//Edit user route =====>
router.get('/:id/edit', (req, res, next) => {
  Plan.find()
    .then((allPlans) => {
      User.findById(req.params.id)
        .then(foundUser =>{
          res.render('user/user-edit', {plans: allPlans, user: foundUser})
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((error) => {
      console.log(error);
    })
});

//POST /user/5c742b2ae09a3a265d1ea374/edit
router.post('/:id/edit', (req, res, next) => {
  const { fullName, email, plan } = req.body;
  console.log('plan is: ', req.body.plan)
  User.findById(req.params.id)
    .then((user) =>{
      user.fullName = fullName;
      user.email = email;
      const isIncluded = user.plan.indexOf(req.body.plan) > -1;
      // if(isIncluded){
      //   // req.flash()
      // }
      if(req.body.plan && !isIncluded){
        user.plan.push(req.body.plan);
      }
      user.save()
        .then(() => {
          res.redirect('/user/manage');
        })
        .catch((error) =>{
          console.log(error);
        })      
    })
    .catch((error) =>{
      console.log(error);
    })
})


//POST /user/5c742b2ae09a3a265d1ea374/delete
router.post('/:id/delete', (req, res, next) =>{
  console.log('The deleted user is: ', req.params.id)
  User.findByIdAndDelete({'_id': req.params.id})
    .then(deletedUser =>{
      res.redirect('/user/manage')
    })
    .catch(error => console.log('error while deleting the user: ', error))
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

module.exports = router;