import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

let server: Server;
const PORT = 3000;

async function main() {
  const DB_URI = process.env.DB_URI as string;
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
    server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}
main();
