import connectToDatabase from "@/lib/mongoose";
import { Store } from "@/models/store.model";
import { getAwardModel } from "@/models/award.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { utm_term, utm_source } = await req.json();
    console.log(" utm_term reçue:", utm_term);
    console.log("🏪 UTM Source reçu:", utm_source);

    if (!utm_term || !utm_source) {
      return NextResponse.json({
        success: false,
        message: "utm_term et utm_source sont requis",
        status: 400,
      });
    }

    await connectToDatabase();

    const store = await Store.findOne({ utm_term, utm_source });
    if (!store) {
      return NextResponse.json(
        { success: false, message: "Store non trouvé" },
        { status: 404 }
      );
    }

    if (!mongoose.connection.db) {
      return "connexion impossible";
    }

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const awardCollections = collections
      .map((col) => col.name)
      .filter((name) => name.startsWith(utm_source));

    console.log("📚 Collections trouvées:", awardCollections);

    const stats = {
      terminalId: utm_term,
      storeSource: utm_source,
      totalTickets: 0,
      foundTickets: 0,
      totalParticipants: 0,
      rewards: [] as Array<{ type: string; count: number; found: number }>,
      collectionsFromSource: awardCollections,
    };

    for (const collectionName of awardCollections) {
      const AwardModel = getAwardModel(collectionName);

      const totalAwardsInCollection = await AwardModel.countDocuments({});

      const awards = await AwardModel.find({
        utm_source: utm_source,
      });

      stats.totalTickets += totalAwardsInCollection;

      if (awards.length > 0) {
        const foundTickets = awards.filter((a) => a.isFind).length;
        const participants = new Set(
          awards.filter((a) => a.user !== null).map((a) => a.user?.toString())
        ).size;

        stats.foundTickets += foundTickets;
        stats.totalParticipants += participants;

        const rewardType = collectionName.replace(utm_source, "");
        stats.rewards.push({
          type: rewardType,
          count: totalAwardsInCollection,
          found: foundTickets,
        });
      }
    }

    console.log("📊 Statistiques générées:", stats);

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("❌ Erreur:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
