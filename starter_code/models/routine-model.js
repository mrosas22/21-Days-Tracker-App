const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
  calories:   { type: Number, default: 0 },
  water:      { type: Number, default: 0 },
  sleep:      { type: Number, default: 0 },
  exercise:   { type: Number, default: 0 },
  member  :   { type: Schema.Types.ObjectId, ref: "User" },
  }, {
    timestamps: true
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;