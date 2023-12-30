"use client"
import { Job, User } from '@prisma/client'
import React from 'react'
import Heading from './Heading'
import JobCard from './JobCard'
import { jobWithCompanyWIthJobsWithUsers } from '@/types'

export default function JobsList({jobs, currentUser, title = "find your dream job", subtitle = " jobs that will suit you"}: {jobs: jobWithCompanyWIthJobsWithUsers[], currentUser: User, title?: string, subtitle?: string}) {
  return (
    <div className='gap-2 flex flex-col w-full p-4'>
        <Heading title={title} subtitle={subtitle} /> 
        <div className='flex flex-wrap gap-8 w-full justify-center items-center'>
            {jobs.map((job) => (
                <JobCard job={job} currentUser={currentUser} key={job.id} />
            ))}
        </div>
    </div>
  )
}
