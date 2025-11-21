import mongoose, { Schema, models } from "mongoose";

const settingsSchema = new Schema(
  {
    // BRANDING & INFO
    siteName: String,
    logo: String,
    currency: { type: String, default: "INR" },
    gstNumber: String,
    fssaiNumber: String,

    // CONTACT
    contactEmail: String,
    supportEmail: String,
    phone: String,
    address: String,

    // DELIVERY SETTINGS
    deliveryCharge: { type: Number, default: 0 },
    freeDeliveryAbove: { type: Number, default: 0 },
    codEnabled: { type: Boolean, default: true },
    returnsEnabled: { type: Boolean, default: true },
    wishlistEnabled: { type: Boolean, default: true },

    // PAYMENT KEYS
    razorpayKeyId: String,
    razorpayKeySecret: String,
    stripePublic: String,
    stripeSecret: String,

    // APP FEATURES
    maintenance: { type: Boolean, default: false },
    maxFeaturedProducts: { type: Number, default: 10 },
    appVersion: { type: String, default: "1.0.0" },

    // SEO FIELDS
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],

    // SOCIAL LINKS
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,

    // POLICIES
    refundPolicy: String,
    returnPolicy: String,
    privacyPolicy: String,
    termsConditions: String,
  },
  { timestamps: true }
);

export default models.AppSettings ||
  mongoose.model("AppSettings", settingsSchema);
