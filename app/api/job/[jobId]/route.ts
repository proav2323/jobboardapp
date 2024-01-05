import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { ApplicationStatus, UserRole } from "@prisma/client";
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

export async function POST(
  Req: Request,
  { params }: { params: { jobId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role === UserRole.EMPLOYER) {
      return new NextResponse("unaiuthorized", { status: 401 });
    }

    if (!params.jobId) {
      return new NextResponse("send a id", { status: 404 });
    }

    const checkJobId = await db.job.findUnique({
      where: {
        id: params.jobId,
      },
    });

    if (!checkJobId) {
      return new NextResponse("no such job exists", { status: 404 });
    }

    const checkIfUserHasAplliadAlready = await db.jobApplication.findFirst({
      where: {
        AND: [{ userId: currentUser.id }, { jobId: params.jobId }],
        OR: [
          {
            status: ApplicationStatus.APPLIED,
          },
          { status: ApplicationStatus.IN_REVIEW },
          { status: ApplicationStatus.ACCEPTED },
          { status: ApplicationStatus.REJECTED },
        ],
      },
    });

    if (checkIfUserHasAplliadAlready) {
      return new NextResponse("you have already apllied", { status: 402 });
    }

    const jobApplication = await db.jobApplication.create({
      data: {
        userId: currentUser.id,
        jobId: params.jobId,
        status: ApplicationStatus.APPLIED,
      },
    });

    const updatedJob = await db.job.update({
      where: {
        id: params.jobId,
      },
      data: {
        applications: {
          connect: {
            id: jobApplication.id,
          },
        },
      },
      include: {
        applications: {
          include: {
            job: {
              include: {
                company: {
                  include: {
                    jobs: true,
                  },
                },
                User: true,
              },
            },
            user: true,
          },
        },
      },
    });

    const updatedUser = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        jobApplications: {
          connect: {
            id: jobApplication.id,
          },
        },
      },
      include: {
        jobApplications: {
          include: {
            job: {
              include: {
                company: {
                  include: {
                    jobs: true,
                  },
                },
                User: true,
              },
            },
            user: true,
          },
        },
      },
    });

    return NextResponse.json({
      upadtedUser: updatedUser,
      updatedJob: updatedJob,
    });
  } catch (Er: any) {
    return new NextResponse(Er.message, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
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

    if (item === undefined) {
      return NextResponse.json(currentUser);
    }

    favIds = favIds.filter((data) => data !== params.jobId);

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
