import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 505 });
    }

    const notificationss = await db.notifications.updateMany({
      where: {
        seen: false,
        AND: [{ userId: currentUser.id }],
      },
      data: {
        seen: true,
      },
    });

    return NextResponse.json(notificationss);
  } catch (er: any) {
    return new NextResponse(er.message, { status: 500 });
  }
}
