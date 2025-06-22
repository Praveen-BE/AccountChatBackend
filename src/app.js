import express from "express";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const allowOrigin = process.env.ALLOWED_ORIGIN;
const corsOption = {
  origin: "http://" + allowOrigin,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOption));
app.options(/.*/, cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);

export default app;
