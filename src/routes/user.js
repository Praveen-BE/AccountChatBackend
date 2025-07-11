import express from "express";
import userAuth from "../middlewares/auth.js";
import enithiusers from "../models/chatUser.js";

const DISPLAY_PROFILE =
  "firstName lastName mobileNumber profilePhotoUrl about privacy";

const userRouter = express.Router();

userRouter.get("/new/search/:mobileNo", userAuth, async (req, res) => {
  try {
    const { mobileNo } = req.params;
    const regex = new RegExp(mobileNo, "i");
    const showUserInSearchBox = await enithiusers
      .find({ mobileNumber: regex })
      .select(DISPLAY_PROFILE);

    res.json({
      data: showUserInSearchBox,
    });
  } catch (err) {
    res.status(400).send("Error :- " + err.message);
  }
});

export default userRouter;
