import express from "express";
import { validateSignInData, validateSignUpData } from "../utils/validation.js";

import bcrypt from "bcrypt";
import accountChatUsers from "../models/chatUser.js";

const authRouter = express.Router();

authRouter.post("/auth/signup", async (req, res) => {
  try {
    //validation

    validateSignUpData(req);

    // console.log(req.body);

    const { emailId, mobileCountryCode, mobileNumber, confirmPassword } =
      req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(confirmPassword, 10);

    const userData = new accountChatUsers({
      mobileCountryCode,
      mobileNumber,
      emailId,
      password: passwordHash,
    });

    const saveUser = await userData.save();
    const token = await saveUser.getJWT();
    // console.log("auth retrive Token :- " + token);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 3600000),
    });

    res.json({
      message: "User Added Successfully",
      data: {
        userId: userData._id,
        emailId: userData.emailId,
        mobileCountryCode: userData.mobileCountryCode,
        mobileNumber: userData.mobileNumber,
        photoUrl: userData.photoUrl,
        about: userData.about,
      },
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/auth/login", async (req, res) => {
  try {
    // console.log(req.body);
    validateSignInData(req);

    const { emailId, confirmPassword } = req.body;
    // console.log("This " + req.body);
    const user = await accountChatUsers.findOne({ emailId: emailId });
    // console.log(user);
    if (!user) {
      throw new Error("Invalid Credintials !...");
    }
    const isPasswordValid = await user.validatePassword(confirmPassword);
    if (isPasswordValid) {
      const token = await user.getJWT();
      if (!token) {
        return res.status(401).send("Please Login !...");
      }
      // console.log("auth retrive Token :- " + token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 3600000),
      });

      res.json({
        message: "User Added Successfully",
        data: {
          userId: userData._id,
          emailId: userData.emailId,
          mobileCountryCode: userData.mobileCountryCode,
          mobileNumber: userData.mobileNumber,
          photoUrl: userData.photoUrl,
          about: userData.about,
        },
      });
    } else {
      throw new Error("Invalid Credintials...");
    }
  } catch (err) {
    // console.error(err);
    res.status(400).send("Error : Hello" + err);
  }
});

authRouter.post("/auth/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully...");
});

export default authRouter;
