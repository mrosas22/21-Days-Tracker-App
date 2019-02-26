const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
    name:         { type: String },
    description:  { type: String },
    imagePlan:    { type: String },
    exercises:   [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    member:       { type: Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true
});

const Fitness = mongoose.model("Fitness", fitnessSchema);

module.exports = Fitness;
