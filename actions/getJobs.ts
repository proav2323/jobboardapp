import { db } from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import { UserRole } from "@prisma/client";

export default async function getJobs() {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser === null) {
      return [];
    }

    let jobs;
    if (currentUser.role === UserRole.EMPLOYER) {
      if (!currentUser.companyId) {
        return [];
      }

      jobs = await db.job.findMany({
        where: { companyId: currentUser.companyId },
        include: {
          company: {
            include: {
              jobs: true,
              Users: true,
            },
          },
        },
      });
    } else {
      jobs = await db.job.findMany({
        where: {
          deadline: {
            gte: new Date(Date.now()),
          },
        },
        include: {
          company: {
            include: {
              jobs: true,
            },
          },
        },
      });
    }

    if (jobs) {
      return jobs;
    } else {
      return [];
    }
  } catch (er) {
    console.log(er);
    return [];
  }
}
