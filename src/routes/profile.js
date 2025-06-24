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
    profilePhotoUrl,
    about,
    contacts,
    privacy,
  } = req.user;
  // console.log(req.user);
  res.json({
    data: {
      userId: _id,
      firstName: firstName || "First Name",
      lastName: lastName || " ",
      emailId,
      mobileCountryCode,
      mobileNumber,
      profilePhotoUrl,
      about,
      contacts,
      privacy,
    },
  });
});

export default profileRouter;
