import {
  Company,
  Job,
  JobApplication,
  User,
  notifications,
} from "@prisma/client";

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
    company: Omit<Company, "jobs" | "Users"> & {
      jobs: Job[];
      Users: User[];
    };
    User: User;
  };
};

export type UserWithNotApp = Omit<
  User,
  "notifications" | "jobApplications" | "company"
> & {
  notifications: notifcatioType[];
  jobApplications: appailcatios[];
  company: Company;
};

export type notifcatioType = Omit<notifications, "user" | "job"> & {
  user: User;
  job: Job;
};
