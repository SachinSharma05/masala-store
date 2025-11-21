import mongoose, { Schema, models } from "mongoose";

const couponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ["percentage", "fixed"], required: true },

    discount: { type: Number, required: true }, // 10% or ₹100

    minOrder: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: 0 }, // only for % coupons

    usageLimit: { type: Number, default: 1 },  // per user
    usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    expiresAt: { type: Date },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

export default models.Coupon || mongoose.model("Coupon", couponSchema);
