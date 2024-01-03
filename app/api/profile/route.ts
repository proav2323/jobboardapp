import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { Name, resume, companyName, companyDescription, companyIndustry } =
      await req.json();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (currentUser.role === UserRole.JOB_SEEKER && !resume) {
      return new NextResponse("provide a resume", { status: 404 });
    }

    if (
      currentUser.role === UserRole.EMPLOYER &&
      (!companyIndustry || !companyDescription || !companyName)
    ) {
      return new NextResponse("provide a company please", { status: 404 });
    }

    if (currentUser.role === UserRole.EMPLOYER && currentUser.companyId) {
      const comapny = await db.company.update({
        where: {
          id: currentUser.companyId,
        },
        data: {
          name: companyName,
          industry: companyIndustry,
          description: companyDescription,
        },
      });
    }

    const userData = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        Name: Name,
        resume: currentUser.role === UserRole.JOB_SEEKER ? resume : undefined,
      },
    });

    return NextResponse.json(userData);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 501 });
  }
}
