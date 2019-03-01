const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    name       :  { type: String },
    description:  { type: String },
    imagePlan  :  { type: String },
    reviews    : [{ type: Schema.Types.ObjectId, ref: "Review" }]
}, {
    timestamps: true
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;