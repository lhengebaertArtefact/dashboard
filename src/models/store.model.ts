import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  utm_source: { type: String, required: true },
  location: { type: String, required: true },
});

export const Store =
  mongoose.models.Store || mongoose.model("Store", storeSchema, "Store");
