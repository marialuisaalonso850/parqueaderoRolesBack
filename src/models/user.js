const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const getUserInfo =require ("../models/getUserInfo");
const { generateAccessToken, generateRefreshToken } = require("../services/generateTokens");
const Token =require ("../models/token");


const UserSchema = new mongoose.Schema(
  {
    id: { type: Object },
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

UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.usernameExist = async function (gmail) {
  const result = await this.constructor.findOne({ gmail});
  return result !== null;
};

UserSchema.methods.comparePassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);
  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));
  try {
    await new Token({ token: refreshToken }).save();

    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", UserSchema);
