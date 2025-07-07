import mongoose from "mongoose";
import app from "./app";

let server;
const PORT = 3000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://MongoDB:MongoDB@cluster0.x7pm4nr.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}
main()
