import getCurrentUser from '@/actions/getCurrentUser';
import getQueryJobs from '@/actions/getQueryJobs';
import ClientOnly from '@/components/ClientOnly';
import Filters from '@/components/Filters';
import JobsList from '@/components/JobsList';
import { UserWithNotApp, jobWithCompanyWIthJobsWithUsers } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic';

export interface Params {
  companyName?: string;
  companyIndustry?: string;
}

export default async function page({searchParams}: {searchParams: Params}) {


  const jobs: jobWithCompanyWIthJobsWithUsers[] = await getQueryJobs(searchParams);
  const currentUser: UserWithNotApp | null = await getCurrentUser();

  if (!currentUser) {
    return redirect("/")
  }

  return (
    <div className='flex flex-col md:flex-row justify-center w-full mt-[60px]'>
      <div className='flex-[0.2] w-full'>
        <ClientOnly>
           <Filters />
        </ClientOnly>
      </div>
      <div className='flex-[0.8] w-full '>
        <JobsList showButton jobs={jobs} currentUser={currentUser} title='Jobs found' subtitle='jobs that are found with the filters' url='/jobs' />
      </div>
    </div>
  )
}
