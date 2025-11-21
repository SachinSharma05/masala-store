import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    avatar: String,
    role: { type: String, default: "user" }, // user/admin
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", userSchema);
