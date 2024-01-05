import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { jobId: string; appId: string } }
) {
  try {
    const { status, clientId, message } = await req.json();
    const currentUser = await getCurrentUser();

    if (!params.jobId || !params.appId || !status || !clientId || !message) {
      return new NextResponse("invalid url", { status: 404 });
    }

    if (!currentUser || currentUser.role === UserRole.JOB_SEEKER) {
      return new NextResponse("unauthorzied", { status: 401 });
    }

    const notification = await db.notifications.create({
      data: {
        userId: clientId,
        message: message,
        jobId: params.jobId,
        seen: false,
      },
    });

    const upadtedJob = await db.job.update({
      where: {
        id: params.jobId,
      },
      data: {
        applications: {
          update: {
            where: {
              id: params.appId,
            },
            data: {
              status: status,
            },
          },
        },
        notifications: {
          connect: {
            id: notification.id,
          },
        },
      },
    });

    const updatedUser = await db.user.update({
      where: {
        id: clientId,
      },
      data: {
        notifications: {
          connect: { id: notification.id },
        },
      },
    });

    return NextResponse.json(upadtedJob);
  } catch (Er: any) {
    return new NextResponse(Er.message, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { jobId: string; appId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!params.jobId || !params.appId) {
      return new NextResponse("invalid url", { status: 404 });
    }

    if (!currentUser) {
      return new NextResponse("unauthorzied", { status: 401 });
    }

    const jobApp = await db.jobApplication.deleteMany({
      where: {
        id: params.appId,
        jobId: params.jobId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(jobApp);
  } catch (Er: any) {
    return new NextResponse(Er.message, { status: 500 });
  }
}
