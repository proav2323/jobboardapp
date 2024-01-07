import getCurrentUser from '@/actions/getCurrentUser';
import getSearchedJobs from '@/actions/getSearchJobs'
import JobsList from '@/components/JobsList';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page({searchParams}: {searchParams: {search: string}}) {
   
    const jobs = await getSearchedJobs(searchParams);
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return redirect("/")
    }


  return (
    <div className='mt-14'>
      <JobsList jobs={jobs} currentUser={currentUser} removeJob={false} showButton={false} url={`/search?search=${searchParams.search}`} title='Your seach jobs' subtitle={`you seached for ${searchParams.search}`} />
    </div>
  )
}
