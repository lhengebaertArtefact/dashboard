import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Store } from "@/models/store.model";

export async function GET() {
  try {
    await connectToDatabase();

    const stores = await Store.find({});
    console.log("Stores fetched:", stores);

    if (!stores || stores.length === 0) {
      return NextResponse.json(
        { success: false, message: "Aucun store trouvé." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, stores });
  } catch (error) {
    console.error("Erreur lors de la récupération des stores:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}
