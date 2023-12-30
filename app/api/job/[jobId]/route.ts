import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(
  Req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { saved } = await Req.json();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (saved === null || saved === undefined || !params.jobId) {
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
