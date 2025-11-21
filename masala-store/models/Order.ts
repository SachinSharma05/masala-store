import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        qty: Number,
        price: Number,
        image: String,
      },
    ],

    shippingAddress: {
      name: String,
      phone: String,
      pincode: String,
      address: String,
      city: String,
      state: String,
    },

    payment: {
      method: String,        // COD / Razorpay / Stripe
      transactionId: String,
      status: { type: String, default: "pending" },
    },

    status: {                 // order progress
      type: String,
      default: "pending",     // pending, confirmed, shipped, delivered, cancelled
    },

    subtotal: Number,
    shippingFee: Number,
    total: Number,
  },
  { timestamps: true }
);

export default models.Order || mongoose.model("Order", orderSchema);
