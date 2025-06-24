import jwt from "jsonwebtoken";
import accountChatUsers from "../models/chatUser.js";
import dotenv from "dotenv";

dotenv.config();

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // console.log("is Token " + token);
    if (!token) {
      throw new Error("Token is not Valid !");
    }

    const decodeObj = await jwt.verify(token, process.env.JWT_KEY_WORD);
    // console.log(decodeObj);
    const { _id } = decodeObj;
    const user = await accountChatUsers.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    // console.error(err);
    // res.status(400).send("ERROR : " + err);
    res.status(401).send("Unauthorized: " + err.message);
  }
};

export default userAuth;
