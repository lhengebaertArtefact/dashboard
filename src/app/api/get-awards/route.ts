import connectToDatabase from "@/lib/mongoose";
import { Store } from "@/models/store.model";
import { getAwardModel } from "@/models/award.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { utm_term, utm_source } = await req.json();

    if (!utm_term || !utm_source) {
      return NextResponse.json({
        success: false,
        message: "utm_term et utm_source sont requis",
        status: 400,
      });
    }

    await connectToDatabase();

    // 1. Récupérer le store et sa configuration
    const store = await Store.findOne({ utm_term, utm_source });
    if (!store) {
      return NextResponse.json(
        { success: false, message: "Store non trouvé" },
        { status: 404 }
      );
    }

    // 2. Préparer les statistiques de base
    const stats = {
      terminalId: store.utm_term,
      storeSource: store.utm_source,
      location: store.location,
      totalTickets: 0,
      foundTickets: 0,
      totalParticipants: 0,
      rewards: [] as Array<{
        type: string;
        count: number;
        found: number;
        projected: number;
        range: string;
      }>,
    };

    // 3. Pour chaque configuration de gift dans le store
    for (const giftConfig of store.config) {
      const giftName = giftConfig.gift;
      const collectionName = `${utm_source}_${giftName}`.toUpperCase();

      const AwardModel = getAwardModel(collectionName);

      // Compter les awards trouvés pour ce type de gift
      const totalAwards = await AwardModel.countDocuments({
        utm_source,
        utm_term,
      });

      const foundAwards = await AwardModel.countDocuments({
        utm_source,
        utm_term,
        isFind: true,
      });

      // Ajouter aux statistiques
      stats.totalTickets += totalAwards;
      stats.foundTickets += foundAwards;

      stats.rewards.push({
        type: giftName,
        count: totalAwards,
        found: foundAwards,
        projected: giftConfig.nb_gift_projected,
        range: `${giftConfig.min}€ - ${giftConfig.max}€`,
      });
    }

    // 4. Calculer le nombre total de participants uniques
    const baseCollectionName =
      `${utm_source}_${store.config[0].gift}`.toUpperCase();
    const uniqueParticipants = await getAwardModel(baseCollectionName).distinct(
      "user",
      {
        utm_source,
        utm_term,
        user: { $ne: null },
      }
    );
    stats.totalParticipants = uniqueParticipants.length;

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
