import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  name: String,
  value: String,
  description: String,
  isActive: Boolean,
  order: Number,
});

const storeSchema = new mongoose.Schema({
  utm_source: { type: String, required: true },
  utm_term: { type: String, required: true },
  location: { type: String, required: true },
  config: [configSchema],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Store =
  mongoose.models.Store || mongoose.model("Store", storeSchema, "Store");
