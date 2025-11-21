import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    rating: { type: Number, min: 1, max: 5, required: true },
    review: String,
    images: [String],
  },
  { timestamps: true }
);

reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default models.Review || mongoose.model("Review", reviewSchema);
