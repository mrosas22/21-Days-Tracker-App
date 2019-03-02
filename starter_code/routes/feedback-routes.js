const express  = require('express');
const router   = express.Router();
const Plan     = require('../models/plan-model');
const Feedback = require('../models/feedback-model');


//localhost:3000/feedback/5c7735c8865baf788436a5e8/add-review
router.post('/:planId/add-review', (req, res, next) => {
  console.log('Review: ', req.params.planId);
  Feedback.create({
    user        : req.user._id,
    comment     : req.body.comment,
  })
  .then(newComment => {
    Plan.findById(req.params.planId)
        .then(foundPlan => {
            foundPlan.reviews.push(newComment._id);
            foundPlan.save()
            .then(() => {
                res.redirect(`/${foundPlan.name}/${foundPlan._id}`)
            })
            .catch(err => next(err));
            })
        .catch(err => next(err));
  })
  .catch(err => next(err));
})


// delete review
router.post('/:id/delete', (req, res, next) => {
  Review.findByIdAndDelete(req.params.id) 
    .then(() => {
        Room.findOne({'reviews': req.params.id})
            .then(foundPlan => {
                for(let i=0; i< foundPlan.reviews.length; i++ ){
                    console.log(foundPlan.reviews[i]._id.equals(req.params.id))
                    if(foundPlan.reviews[i]._id.equals(req.params.id)){
                        foundPlan.reviews.splice(i, 1);
                    }
                }
                foundPlan.save()
                    .then(() => {
                        res.redirect(`/plan/${foundPlan._id}`)
                    })
                    .catch(err => next(err))
                    })
            .catch(error => console.log('Error while finding the review: ', error))
    })
    .catch(error => console.log('Error while deleting the review: ', error))
})




module.exports = router;