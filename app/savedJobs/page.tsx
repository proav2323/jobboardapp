import getCurrentUser from '@/actions/getCurrentUser'
import getSavedJobs from '@/actions/getSavedJobs';
import Heading from '@/components/Heading';
import JobsList from '@/components/JobsList';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return redirect("/");
    }
    const Jobs = await getSavedJobs()
  return (
    <div className='flex flex-col w-full gap-2 mt-14 pl-2'>
        <JobsList currentUser={currentUser} url='/savedJobs' jobs={Jobs} showButton={false} title='your saved jobs' subtitle='your jobs that you saved to look later' removeJob={true}  />
    </div>
  )
}
