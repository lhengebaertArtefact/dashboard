import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { cpSync } from "fs";

export async function GET() {
  try {
    await connectToDatabase();
    if (!mongoose.connection.db) {
      return;
    }
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const filteredCollections = collections
      .map((col: { name: string }) => col.name)
      .filter((name: string) => !["Store", "User", "Stat"].includes(name));

    console.log("mes collections filtrées");

    const monSet = new Set(
      filteredCollections.map((collection) => {
        if (collection.startsWith("EDFP")) return "EDFP";
        if (collection.startsWith("EL")) return "EL";
        if (collection.startsWith("Relay")) return "Relay";
        if (collection.startsWith("EFB")) return "EFB";
        if (collection.startsWith("DE")) return "Degustation";
        if (collection.startsWith("MODE")) return "mode";
      })
    );

    const reducedCollections = Array.from(monSet);

    return NextResponse.json({ collections: reducedCollections });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des collections" },
      { status: 500 }
    );
  }
}
