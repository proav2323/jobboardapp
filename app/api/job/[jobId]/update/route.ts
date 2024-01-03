import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role === UserRole.JOB_SEEKER) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { title, description, requirements, deadline } = await req.json();

    if (!title || !deadline || !description || !requirements) {
      return new NextResponse("missing filed", { status: 404 });
    }

    const job = await db.job.update({
      data: {
        title: title,
        deadline: deadline,
        description: description,
        requirements: requirements,
      },
      where: {
        id: params.jobId,
      },
    });
    return NextResponse.json(job);
  } catch (err: any) {
    return new NextResponse(err.message);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (
      !currentUser ||
      currentUser.role === UserRole.JOB_SEEKER ||
      !params.jobId ||
      !currentUser.companyId
    ) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const job = await db.job.deleteMany({
      where: {
        id: params.jobId,
        companyId: currentUser.companyId,
      },
    });

    if (!job) {
      return new NextResponse("not found", { status: 404 });
    }

    return NextResponse.json(job);
  } catch (err: any) {
    return new NextResponse(err.message);
  }
}
