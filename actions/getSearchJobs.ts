import { db } from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import { UserRole } from "@prisma/client";
import { Params } from "@/app/jobs/page";

export default async function getSearchedJobs({ search }: { search: string }) {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser === null) {
      return [];
    }

    const jobs = await db.job.findMany({
      where: {
        deadline: {
          gte: new Date(Date.now()),
        },
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { requirements: { contains: search, mode: "insensitive" } },
          {
            company: {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  industry: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        ],
      },
      include: {
        company: {
          include: {
            jobs: true,
          },
        },
        applications: {
          include: {
            job: {
              include: {
                company: {
                  include: {
                    jobs: true,
                    Users: true,
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
