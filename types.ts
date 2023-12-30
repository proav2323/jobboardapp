import { Company, Job, User } from "@prisma/client";

export type jobWithCompanyWIthJobsWithUsers = Omit<Job, "company"> & {
  company: Omit<Company, "jobs"> & {
    jobs: Job[];
  };
};
