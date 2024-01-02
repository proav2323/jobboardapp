import { jobWithCompanyWIthJobsWithUsers } from '@/types'
import { User, UserRole } from '@prisma/client'
import React from 'react'

export default function EmployerJobDetails({job, currentUser}: {job: jobWithCompanyWIthJobsWithUsers, currentUser: User}) {

  if (currentUser.role === UserRole.JOB_SEEKER) {
    return <span className='m-2 p-4 text-lg text-red'>not allowed here</span>
  }

  return (
    <div>
      {job.applications.map((app) => (
        <span key={app.id}>{app.user.Name}</span>
      ))}
    </div>
  )
}
 