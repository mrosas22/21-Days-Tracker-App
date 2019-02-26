const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    name:         { type: String },
    description:  { type: String },
    imagePlan:    { type: String },
    owner:        { type: Schema.Types.ObjectId, ref: "User" },
    exercises:   [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    member:      [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;