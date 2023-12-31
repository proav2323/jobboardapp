import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (
      !currentUser ||
      !currentUser.companyId ||
      currentUser.role === UserRole.JOB_SEEKER
    ) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { title, description, requirements, deadline } = await req.json();

    if (!title || !deadline || !description || !requirements) {
      return new NextResponse("missing filed", { status: 404 });
    }

    const job = await db.job.create({
      data: {
        companyId: currentUser.companyId,
        title: title,
        deadline: deadline,
        description: description,
        requirements: requirements,
        userId: currentUser.id,
      },
    });
    console.log(job);
    return NextResponse.json(job);
  } catch (err: any) {
    return new NextResponse(err.message);
  }
}
