import express from "express";
import userAuth from "../middlewares/auth.js";

const profileRouter = express.Router();

profileRouter.get("/profile/user", userAuth, async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    emailId,
    mobileCountryCode,
    mobileNumber,
    photoUrl,
    about,
  } = req.user;
  const { token } = req.cookies;
  // console.log(token);

  res.json({
    data: {
      userId: _id,
      firstName,
      lastName,
      emailId,
      mobileCountryCode,
      mobileNumber,
      photoUrl,
      about,
    },
  });
});

export default profileRouter;
