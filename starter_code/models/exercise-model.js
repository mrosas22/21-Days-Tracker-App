const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  memberId:   { type: Schema.Types.ObjectId, ref: "User" },
  calories:   { type: Number, default: 0 },
  water:      { type: Number, default: 0 },
  sleep:      { type: Number, default: 0 },
  }, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;