import connectToDatabase from "@/lib/mongoose";
import { Store } from "@/models/store.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { terminal } = await req.json();

  if (!terminal) {
    return NextResponse.json({
      success: false,
      message: "Le terminal est requis",
      status: 400,
    });
  }

  try {
    await connectToDatabase();

    const rewards = await Store.find({ store: terminal });
    if (!rewards || rewards.length === 0) {
      return NextResponse.json(
        { success: false, message: "aucune réponse trouvée" },
        { status: 404 }
      );
    }

    const foundReward = rewards.filter((item) => item.isFind);
    const groupingRewards = foundReward.reduce((acc, current) => {
      if (!acc[current.award]) {
        acc[current.award] = 1;
      } else {
        acc[current.award] += 1;
      }
      return acc;
    }, {});

    if (Object.keys(groupingRewards).length === 0) {
      return NextResponse.json(
        { success: false, message: "il n'y a pas de data" },
        { status: 404 }
      );
    } else {
      return NextResponse.json({ success: true, stats: groupingRewards });
    }
  } catch (error) {
    console.error("Erreur lors de l'exécution de l'API :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Problème avec le serveur",
      },
      { status: 500 }
    );
  }
}
