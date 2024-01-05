import { jobWithCompanyWIthJobsWithUsers } from "@/types";
import getCurrentUser from "./getCurrentUser";
import { db } from "@/lib/prismadb";

export default async function getSavedJobs() {
  const currentUser = await getCurrentUser();

  if (currentUser === null) {
    return [];
  }

  const jobs: jobWithCompanyWIthJobsWithUsers[] = await db.job.findMany({
    where: {
      id: {
        in: [...(currentUser.yourSavedJobs || [])],
      },
    },
    include: {
      company: {
        include: {
          jobs: true,
          Users: true,
        },
      },
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
      User: true,
    },
  });

  return jobs;
}
