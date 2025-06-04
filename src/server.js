import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connectDB()
  .then(() => {
    console.log("Database Connection Established...");
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database cannot be Connected !!! " + error);
  });
