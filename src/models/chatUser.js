import mongoose from "mongoose";
import { defaultProfileURL, defaultAbout } from "../constant.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 25,
    },
    lastName: {
      type: String,
      maxLength: 25,
    },
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      set: (v) => v.replace(/\s\s+/g, ""),
      maxLength: 100,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email Address : ");
        }
      },
    },
    mobileCountryCode: {
      type: Number,
      require: true,
    },
    mobileNumber: {
      type: Number,
      unique: true,
      require: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is weak : " + value + " ");
        }
      },
    },
    photoUrl: {
      type: String,
      default: defaultProfileURL,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL : " + value);
        }
      },
    },
    about: {
      type: String,
      default: defaultAbout,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY_WORD, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const accountChatUsers = mongoose.model("enithiusers", userSchema);

export default accountChatUsers;
