import express from "express";
import { validateSignInData, validateSignUpData } from "../utils/validation.js";

import bcrypt from "bcrypt";
import accountChatUsers from "../models/chatUser.js";
import userAuth from "../middlewares/auth.js";

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
        firstName: userData.firstName || "First Name",
        lastName: userData.lastName || " ",
        emailId: userData.emailId,
        mobileCountryCode: userData.mobileCountryCode,
        mobileNumber: userData.mobileNumber,
        profilePhotoUrl: userData.profilePhotoUrl,
        about: userData.about,
        contacts: userData.contacts,
        privacy: userData.privacy,
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
    const userData = await accountChatUsers.findOne({ emailId: emailId });
    // console.log(user);
    if (!userData) {
      throw new Error("Invalid Credintials !...");
    }
    const isPasswordValid = await userData.validatePassword(confirmPassword);
    if (isPasswordValid) {
      const token = await userData.getJWT();
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
          firstName: userData.firstName || "First Name",
          lastName: userData.lastName || " ",
          emailId: userData.emailId,
          mobileCountryCode: userData.mobileCountryCode,
          mobileNumber: userData.mobileNumber,
          profilePhotoUrl: userData.profilePhotoUrl,
          about: userData.about,
          contacts: userData.contacts,
          privacy: userData.privacy,
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

authRouter.get("/auth/logout", userAuth, async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.json({ message: "Logout Successfully..." });
});

export default authRouter;
