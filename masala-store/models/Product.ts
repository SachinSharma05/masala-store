import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true },
    mrp: Number,
    images: [String],
    category: { type: String },
    stock: { type: Number, default: 0 },
    status: { type: String, default: "active" }, // active / inactive
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Product || mongoose.model("Product", productSchema);
