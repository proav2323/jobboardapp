import { Company, Job, JobApplication, User } from "@prisma/client";

export type jobWithCompanyWIthJobsWithUsers = Omit<
  Job,
  "company" | "applications" | "User"
> & {
  company: Omit<Company, "jobs"> & {
    jobs: Job[];
  };
  applications: appailcatios[];
  User: User;
};

export type appailcatios = Omit<JobApplication, "user" | "job"> & {
  user: User;
  job: Omit<Job, "company" | "User"> & {
    company: Omit<Company, "jobs"> & {
      jobs: Job[];
    };
  };
};
