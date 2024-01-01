import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  Req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role === UserRole.EMPLOYER) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.jobId) {
      return new NextResponse("soemhting went wrong", { status: 401 });
    }

    let favIds = [...(currentUser.yourSavedJobs || [])];

    const item = favIds.find((data) => data === params.jobId);

    if (item) {
      return NextResponse.json(currentUser);
    }

    favIds.push(params.jobId);

    const savedUser = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        yourSavedJobs: favIds,
      },
    });

    return NextResponse.json(savedUser);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
