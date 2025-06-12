import mongoose from "mongoose";

const user_scheema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
  },
});

const User = mongoose.model("User", user_scheema);

export default User;
