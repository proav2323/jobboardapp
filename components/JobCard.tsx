"use client"
import { Job, User, UserRole } from '@prisma/client'
import React, { MouseEventHandler, useCallback, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from 'date-fns'
import { Button } from './ui/button'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/useModel.store'
import { jobWithCompanyWIthJobsWithUsers } from '@/types'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function JobCard({job, currentUser}: {job: jobWithCompanyWIthJobsWithUsers, currentUser: User}) {
    const model = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const apply = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.stopPropagation();
     event.preventDefault();


    }

    const save = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.stopPropagation();
     event.preventDefault();

    setIsLoading(true);

     axios.put(`/api/job/${job.id}`, {saved: true}).then(() => {
       toast.success("job saved");
       model.onClose();
     }).catch((err) => {
        toast.error(err.response.data)
     }).finally(() => {
        setIsLoading(false);
     })

    }

  const openDetials = useCallback(() => {
    if (currentUser.role === UserRole.EMPLOYER) {
      model.onOpen("JobDeatials", {currentUser: currentUser, job: job})
    } else {
      model.onOpen("JobDeatials", {currentUser: currentUser, job: job})
    }
  }, [currentUser, model, job])
  return (
    <Card className='w-[90vw] md:w-[300px] cursor-pointer' onClick={openDetials}>
        <CardHeader>
          <CardTitle className='mx-auto'>{job.title}</CardTitle>
        </CardHeader>
     <CardContent className='flex flex-col gap-2 w-full'>
         <CardDescription>Deadline: {format(job.deadline, "MM/dd/yyyy")}</CardDescription>
     </CardContent>
      {currentUser.role === UserRole.JOB_SEEKER && (<CardFooter className='flex justify-between'>
            <Button onClick={save} variant={"outline"} className='gap-2'> <Save size={24} /> Save Job</Button>
            <Button onClick={apply}>Apply</Button>
      </CardFooter>)}
    </Card>
  )
}
