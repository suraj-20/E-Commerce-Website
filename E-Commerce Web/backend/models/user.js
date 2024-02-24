const { createHmac, randomBytes } = require("crypto");
const mongoose = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  salt: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = "somerandomsalt";

  const hashedPassword = createHmac("sha256", salt)
    .update("password")
    .digest("hex");

  this.salt = salt;
  this.password = this.password;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);
  if (!user) throw new Error("User not found");

  const salt = user.salt;
  const hashedPassword = user.password;
  console.log("hash", hashedPassword);

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  console.log("userhash", userProvidedHash);

  if (hashedPassword !== userProvidedHash)
    throw new Error("Incorrect password");

  return user;
});

const User = mongoose.model("user", userSchema);

module.exports = User;
