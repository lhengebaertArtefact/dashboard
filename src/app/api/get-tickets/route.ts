import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { getAwardModel } from "@/models/award.model";

export async function POST(request: Request) {
  try {
    const { collectionPrefix } = await request.json();
    await connectToDatabase();

    if (!mongoose.connection.db) return;

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    const matchingCollections = collections
      .map((col: { name: string }) => col.name)
      .filter((name: string) => name.startsWith(collectionPrefix));

    const collectionsData = await Promise.all(
      matchingCollections.map(async (collectionName) => {
        const model = getAwardModel(collectionName);
        const totalTickets = await model.countDocuments();
        const awards = await model.find({ isFind: true });

        const locationsWithFinds = Array.from(
          new Set(awards.map((award) => award.location))
        );

        const utmSourcesWithFinds = Array.from(
          new Set(awards.map((award) => award.utm_source))
        );

        return {
          collectionName,
          totalTickets,
          foundTickets: awards.length,
          locations: locationsWithFinds,
          utmSources: utmSourcesWithFinds,
        };
      })
    );

    return NextResponse.json({ collections: collectionsData });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des collections" },
      { status: 500 }
    );
  }
}
