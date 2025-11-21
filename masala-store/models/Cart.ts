import mongoose, { Schema, models } from "mongoose";

const cartSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: Number,
      },
    ],
  },
  { timestamps: true }
);

export default models.Cart || mongoose.model("Cart", cartSchema);
