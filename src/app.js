import express from "express";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/", authRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World !");
// });

export default app;
