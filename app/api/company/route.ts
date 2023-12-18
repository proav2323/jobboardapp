import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const company = await db.company.findMany();

    return NextResponse.json(company);
  } catch (err) {
    return new NextResponse("somethingw ent wrong", { status: 501 });
  }
}
