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
      });
    } else {
      jobs = await db.job.findMany({
        where: {
          deadline: {
            gte: new Date(Date.now()),
          },
        },
      });
    }
    return jobs;
  } catch (er) {
    console.log(er);
    return [];
  }
}
