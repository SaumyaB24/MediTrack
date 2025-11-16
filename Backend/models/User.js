import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    ethAddress: { type: String, required: true, unique: true },
    name: String,
    email: String,
    role: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
