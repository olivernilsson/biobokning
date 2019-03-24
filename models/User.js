const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  admin: false
});

userSchema.pre("save", async function() {
  // here we replace the password with the encrypted password
  this.password = await bcrypt.hash(this.password + passwordSalt, 10);
});

module.exports = db.model("User", userSchema);
