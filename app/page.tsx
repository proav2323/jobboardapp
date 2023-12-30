import getCurrentUser from '@/actions/getCurrentUser'
import getJobs from '@/actions/getJobs';
import ClientOnly from '@/components/ClientOnly';
import Hero from '@/components/Hero';
import JobsList from '@/components/JobsList';
import IntialModel from '@/components/models/IntialModel';
import { useModal } from '@/hooks/useModel.store';
import { jobWithCompanyWIthJobsWithUsers } from '@/types';
import { Company, Job, User, UserRole } from '@prisma/client';
import Image from 'next/image'
import { redirect } from 'next/navigation';

export default async function Home() {
  const currentUser = await getCurrentUser();
  const jobs: jobWithCompanyWIthJobsWithUsers[] = await getJobs();

  if (!currentUser) {
    console.log(currentUser)
    return (<ClientOnly><IntialModel /></ClientOnly>)
  }

  return (
    <ClientOnly>
      <div className='flex flex-col gap-2'>
       <Hero currentUser={currentUser} />
       <JobsList jobs={jobs} currentUser={currentUser} title={currentUser.role === UserRole.JOB_SEEKER ? undefined : "Your Jobs"} subtitle={currentUser.role === UserRole.JOB_SEEKER ? undefined : "Your posted jobs"}  />
     </div>
    </ClientOnly>
  )
}
