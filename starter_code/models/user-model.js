const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email    : {type: String, require: true},
  password : {type: String, require: true},
  fullName : {type: String, require: true},
  birthday : {type: String, require: false},
  googleID : {type: String},
  weight   : {type: Number, require: false},
  role     : {type: String, enum: ['GUEST', 'EDITOR', 'ADMIN'], default: 'GUEST'},
  plan     : [{ type: Schema.Types.ObjectId, ref: 'Plan' }]
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;