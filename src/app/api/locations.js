import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Store } from "@/models/store"; // Assurez-vous du chemin correct

// Connectez-vous à MongoDB si ce n'est pas déjà fait
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export async function GET() {
  try {
    await connectDB(); // Connexion à la base de données

    // Récupérer toutes les locations
    const stores = await Store.find({}, "location").lean();
    const locations = stores.map((store) => store.location);

    // Renvoi des données au format JSON
    return NextResponse.json({ locations });
  } catch (error) {
    console.error("Erreur lors de la récupération des locations :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données." },
      { status: 500 }
    );
  }
}
