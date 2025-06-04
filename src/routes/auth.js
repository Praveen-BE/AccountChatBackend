import express from "express";
import { validateSignInData, validateSignUpData } from "../utils/validation.js";

import bcrypt from "bcrypt";
import accountChatUsers from "../models/chatUser.js";
// import { getJWT, validatePassword } from "../models/chatUser.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validation
    validateSignUpData(req);

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
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 3600000),
    });

    res.json({
      message: "User Added Successfully",
      data: {
        _id: userData._id,
        mobileCountryCode: userData.mobileCountryCode,
        mobileNumber: userData.mobileNumber,
        emailId: userData.emailId,
      },
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateSignInData(req);

    const { emailId, password } = req.body;
    const user = await accountChatUsers.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credintials !...");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      if (!token) {
        return res.status(401).send("Please Login !...");
      }
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 3600000),
      });
      res.json(user);
    } else {
      throw new Error("Invalid Credintials...");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfully...");
});

export default authRouter;
