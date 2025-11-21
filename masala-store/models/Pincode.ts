import mongoose, { Schema, models } from "mongoose";

const pincodeSchema = new Schema(
  {
    pincode: { type: String, required: true, unique: true },

    isServiceable: { type: Boolean, default: true },
    cod: { type: Boolean, default: true },

    deliveryCharge: { type: Number, default: 0 },
    estimatedDays: { type: Number, default: 2 },
  },
  { timestamps: true }
);

export default models.Pincode || mongoose.model("Pincode", pincodeSchema);
