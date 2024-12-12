import mongoose from "mongoose";

const awardSchema = new mongoose.Schema(
  {
    num_code: { type: String, required: true },
    award: { type: String, required: true },
    store: { type: String, required: true },
    isFind: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    utm_source: { type: String, default: "" },
    utm_term: { type: String, default: "" },
    location: { type: String, default: "" },
    findAt: { type: String, default: "" },
  },
  {
    collection: process.env.COLLECTION_NAME, // Sera défini dynamiquement selon la collection
  }
);

export const getAwardModel = (collectionName: string) => {
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, awardSchema, collectionName)
  );
};
