import app from "./app.js";
import mongoose from "mongoose";

const DB_HOST =
  "mongodb+srv://Zahar:Gu0zbwR9zHM93gnB@cluster0.sj3tsqj.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=AtlasApp";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(10000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
