"use client"
import { Job, User } from '@prisma/client'
import React from 'react'
import Heading from './Heading'
import JobCard from './JobCard'
import { UserWithNotApp, jobWithCompanyWIthJobsWithUsers } from '@/types'
import EmptyState from './EmptyState'

export default function JobsList({jobs, currentUser, title = "find your dream job", subtitle = " jobs that will suit you", url="/", showButton=true, removeJob=false}: {jobs: jobWithCompanyWIthJobsWithUsers[], currentUser: UserWithNotApp, title?: string, subtitle?: string, url: string, showButton: boolean, removeJob?: boolean}) {

  if (jobs.length === 0) {
    return <EmptyState url={url} showButton={showButton} subtitle='no jobs found with the filters' title='no job found'  />
  }
  return (
    <div className='gap-2 flex flex-col w-full p-4'>
        <Heading title={title} subtitle={subtitle} /> 
        <div className='flex flex-wrap gap-8 w-full justify-center items-center'>
            {jobs.map((job) => (
                <JobCard job={job} currentUser={currentUser} key={job.id} removeJob={removeJob} />
            ))}
        </div>
    </div>
  )
}
