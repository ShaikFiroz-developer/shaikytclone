// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  img: String,
  email: String,
  designation: String,
  password: String,
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
