import mongoose, { Schema, models } from "mongoose";

const returnSchema = new Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: Number,
      },
    ],

    reason: { type: String, required: true },
    description: String,
    images: [String], // return proof images

    status: {
      type: String,
      enum: ["requested", "approved", "rejected", "item_received", "refunded"],
      default: "requested",
    },

    refund: {
      method: { type: String, default: "original" }, // original / manual
      amount: Number,
      transactionId: String,
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
    },

    adminNotes: String,
  },
  { timestamps: true }
);

export default models.Return || mongoose.model("Return", returnSchema);
