import mongoose, { Schema, models } from "mongoose";

const wishlistSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
