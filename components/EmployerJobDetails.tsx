"use client"
import { appailcatios, jobWithCompanyWIthJobsWithUsers } from '@/types'
import { ApplicationStatus, User, UserRole } from '@prisma/client'
import React, { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import JobAppItem from './JobAppItme'
import { ScrollArea } from './ui/scroll-area'

export default function EmployerJobDetails({job, currentUser}: {job: jobWithCompanyWIthJobsWithUsers, currentUser: User}) {

    let jobAppp = job.applications.filter((app) => app.status !== ApplicationStatus.ACCEPTED);
  jobAppp = jobAppp.filter((app) => app.status !== ApplicationStatus.REJECTED);

  const [jobApp, setJobApp] = useState<appailcatios[]>(jobAppp);

  if (currentUser.role === UserRole.JOB_SEEKER) {
    return <span className='m-2 p-4 text-lg text-red'>not allowed here</span>
  }

  const chnageJobApp = () => {
    setJobApp(job.applications);
  }


  return (
    <div className='flex flex-col justify-start items-start gap-3 w-full'>

        <div className='flex flex-col gap-2 w-full'>
        <span className='dark:text-neutral-500 text-neutral-300 text-lg'>created By:</span>
        <div className='ml-10 w-fit flex flex-col'>
            <span className='dark:text-white text-black text-md'>{job.User.Name}</span>
            <span className='dark:text-neutral-500 text-neutral-300 text-sm'>{job.User.email}</span>
        </div>
        </div>

        <div className='flex flex-col gap-2 w-full'>
        <span className='dark:text-neutral-500 text-neutral-300 text-lg'>Job Applicatnts that are not rejected and not accepted</span>
        <span className='ml-auto text-md text-blue-500 hover:underline cursor-pointer' onClick={chnageJobApp}>See All Applications</span>
        <div className='flex flex-col w-full'>
          <ScrollArea className='h-[30vh] w-full mx-auto rounded-md border'>
                {jobApp.map((app, index) => (
                   <JobAppItem key={app.id} app={app} currentUser={currentUser} job={job} />
                ))}
          </ScrollArea>
        </div>
        </div>
    </div>
  )
}
 