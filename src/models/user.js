const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
} = require("../services/generateTokens");
const getUserInfo = require("../models/getUserInfo");

const UserSchema = new mongoose.Schema(
  {
    gmail: {
      type: String, 
      unique: true,
    },
    password: { 
      type: String, 
      required: true,
    },
    username: { 
      type: String, 
      unique: true,
    },
    role: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.path("gmail").validate({
  validator: async function (value) {
    const count = await this.model("User").countDocuments({ gmail: value });
    return count === 0;
  },
  message: "El nombre de usuario ya está en uso",
});

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
})

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

module.exports = mongoose.model("User", UserSchema);
