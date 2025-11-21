import mongoose, { Schema, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: String,
    image: String,
    status: { type: String, default: "active" }, // active/inactive
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Category || mongoose.model("Category", categorySchema);
