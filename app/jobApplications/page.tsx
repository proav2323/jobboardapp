import getCurrentUser from '@/actions/getCurrentUser'
import Heading from '@/components/Heading';
import JobApplicationsDataTable from '@/components/JobApplicationsDataTable';
import { UserWithNotApp } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const currentUser: UserWithNotApp | null = await getCurrentUser();

    if (!currentUser) {
        return redirect("/");
    }
  return (
    <div className='flex flex-col gap-2 mt-14 pl-2'>
        <Heading title='Your Job Applications' subtitle='your jab applicants that you have aplliad on' />
        <JobApplicationsDataTable jobApp={currentUser.jobApplications} />
    </div>
  )
}
