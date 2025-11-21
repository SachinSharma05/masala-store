import mongoose, { Schema, models } from "mongoose";

const addressSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    name: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },

    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Address || mongoose.model("Address", addressSchema);
