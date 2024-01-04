import { db } from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";
import { UserRole } from "@prisma/client";
import { Params } from "@/app/jobs/page";

export default async function getQueryJobs({
  companyIndustry,
  companyName,
}: Params) {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser === null) {
      return [];
    }

    let query: any = {
      deadline: {
        gte: new Date(Date.now()),
      },
    };

    if (companyName) {
      query = {
        ...query,
        company: {
          ...query.company,
          name: companyName,
        },
      };
    }

    if (companyIndustry) {
      query = {
        ...query,
        company: {
          ...query.company,
          industry: companyIndustry,
        },
      };
    }

    const jobs = await db.job.findMany({
      where: query,
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
