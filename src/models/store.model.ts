import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  min: Number,
  max: Number,
  gift: String,
  nb_gift_projected: Number,
  nb_gift_max: Number,
  nb_gift_find: Number,
  next: Number,
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
