import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  gift: { type: String, required: true },
  nb_gift_max: { type: Number, required: false },
  nb_gift_find: { type: Number, required: true, default: 0 },
  next: { type: Number, required: true, default: 0 },
});

const storeSchema = new mongoose.Schema({
  utm_source: { type: String, required: true },
  utm_term: { type: String, required: false },
  location: { type: String, required: true },
  config: [configSchema],
  users: { type: Array, default: [] },
});

export const Store =
  mongoose.models.Store || mongoose.model("Store", storeSchema, "Store");
