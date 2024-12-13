import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Store } from "@/models/store.model";

export async function POST(request: Request) {
  try {
    const { utm_source, utm_term } = await request.json();
    await connectToDatabase();

    const store = await Store.findOne({ utm_source, utm_term });

    if (!store) {
      return NextResponse.json(
        { success: false, message: "Store non trouvé." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, store });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
}
