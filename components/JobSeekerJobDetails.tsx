"use client"
import { jobWithCompanyWIthJobsWithUsers } from '@/types'
import { format } from 'date-fns';
import { Save } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from './ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useModal } from '@/hooks/useModel.store';

export default function JobSeekerJobDetails({job, disabled = false}: {job: jobWithCompanyWIthJobsWithUsers, disabled?: boolean}) {

    let jobDesriptions: string[] = job.description.split("`");
    let jobRequirements: string[] = job.requirements.split("`");

    const model = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const apply = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.stopPropagation();
     event.preventDefault();

    setIsLoading(true);

     axios.post(`/api/job/${job.id}`).then(() => {
       toast.success(`job application is appliad on the job ${job.title}`);
       model.onClose();
     }).catch((err) => {
        toast.error(err.response.data)
     }).finally(() => {
        setIsLoading(false);
     })

    }

    const save = async (event: React.MouseEvent<HTMLButtonElement>) => {

     setIsLoading(true);

     event.stopPropagation();
     event.preventDefault();

     axios.put(`/api/job/${job.id}`).then(() => {
       toast.success("job saved");
       model.onClose();
     }).catch((err) => {
        toast.error(err.response.data)
     }).finally(() => {
        setIsLoading(false);
     })
    }

  return (
    <div className='flex flex-col items-start w-full gap-3'>
        <div className='flex flex-col gap-2 w-full'>
        <span className='dark:text-neutral-500 text-neutral-300 text-lg'>Job Description:</span>
        <ul className='ml-10 w-fit dark:text-white text-black'>
            {jobDesriptions.map((desc) => (
                <li key={desc}>{desc}</li>
            ))}
        </ul>
        </div>

       <div className='flex flex-col gap-2 w-full'>
        <span className='dark:text-neutral-500 text-neutral-300 text-lg'>Job requirements:</span>
        <ul className='ml-10 w-fit dark:text-white text-black'>
            {jobRequirements.map((desc) => (
                <li key={desc}>{desc}</li>
            ))}
        </ul>
        </div>

        <div className='flex flex-col gap-2 w-full'>
        <span className='dark:text-neutral-500 text-neutral-300 text-lg'>company:</span>
        <div className='ml-10 w-fit flex flex-col'>
            <span className='dark:text-white text-black text-md'>{job.company.name}</span>
            <span className='dark:text-neutral-500 text-neutral-300 text-sm'>{job.company.description}</span>
        </div>
        </div>

        <span className='dark:text-white text-black text-lg'>Deadline: {format(job.deadline, "MM/dd/yyyy")}</span>

        <div className='flex flex-row justify-between items-center w-full mt-2'>
            <Button disabled={isLoading || disabled} onClick={save} variant={"outline"} className='gap-2'> <Save size={24} /> Save Job</Button>
            <Button disabled={isLoading || disabled} onClick={apply}>Apply</Button>
        </div>
    </div>
  )
}
