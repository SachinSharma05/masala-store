import mongoose, { Schema, models } from "mongoose";

const bannerSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    image: { type: String, required: true }, // cloudinary url
    link: String, // href when clicked
    type: { type: String, default: "homepage" }, // homepage, category, product, promo etc.
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Banner || mongoose.model("Banner", bannerSchema);
