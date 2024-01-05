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
import { Delete, DeleteIcon, Save, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/useModel.store'
import { UserWithNotApp, jobWithCompanyWIthJobsWithUsers } from '@/types'
import axios from 'axios'
import toast from 'react-hot-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { CiMenuKebab } from "react-icons/ci";
import AlertDailgo from './AlertDailgo'

export default function JobCard({job, currentUser, removeJob = false}: {job: jobWithCompanyWIthJobsWithUsers, currentUser: UserWithNotApp, removeJob?: boolean}) {
    const model = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setIsOpen] = useState(false);

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

  const Router = useRouter();


    const save = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.stopPropagation();
     event.preventDefault();

     if (removeJob === true) {

    setIsLoading(true);

     axios.delete(`/api/job/${job.id}`).then(() => {
       toast.success("job removed");
       model.onClose();
       Router.refresh();
     }).catch((err) => {
        toast.error(err.response.data)
     }).finally(() => {
        setIsLoading(false);
     })
     } else {
      setIsLoading(true);

     axios.put(`/api/job/${job.id}`).then(() => {
       toast.success("job saved");
       model.onClose();
       Router.refresh();
     }).catch((err) => {
        toast.error(err.response.data)
     }).finally(() => {
        setIsLoading(false);
     })
     }

    }


  const openDetials = useCallback(() => {
    if (currentUser.role === UserRole.EMPLOYER) {
      model.onOpen("JobDeatials", {currentUser: currentUser, job: job})
    } else {
      model.onOpen("JobDeatials", {currentUser: currentUser, job: job})
    }
  }, [currentUser, model, job])

  const openMenu = (event:  React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
     event.preventDefault();
  }

  const edit = (event:  React.MouseEvent) => {
    event.stopPropagation();
     event.preventDefault();

     model.onOpen("addJob", {isEditingJob: true, job: job})
  }


  const openAlart = (event:  React.MouseEvent) => {
      event.stopPropagation();
     event.preventDefault(); 

     setIsOpen(true);
  }

  const onCancel = () => {
    setIsOpen(false);
  }

  const onSubmit = () => {
  setIsLoading(true);
  axios.delete(`/api/job/${job.id}/update`).then(() => {
       toast.success("job deleted");
       Router.refresh();
       setIsOpen(false);
     }).catch((err) => {
        toast.error(err.response.data)
     }).finally(() => {
        setIsLoading(false);
     })
  }
  return (
    <>
    <Card className='w-[90vw] md:w-[300px] cursor-pointer relative' onClick={openDetials}>
        <CardHeader>
          <CardTitle className='mx-auto'>{job.title}</CardTitle>
        </CardHeader>
     <CardContent className='flex flex-col gap-2 w-full'>
         <CardDescription>Deadline: {format(job.deadline, "MM/dd/yyyy")}</CardDescription>
     </CardContent>
      {currentUser.role === UserRole.JOB_SEEKER && (<CardFooter className='flex justify-between'>
            <Button disabled={isLoading} onClick={save} variant={"outline"} className='gap-2'> {removeJob ? <Trash size={24} /> :<Save size={24} />} {removeJob ? "Remove Job" : "Save Job"}</Button>
            <Button disabled={isLoading} onClick={apply}>Apply</Button>
      </CardFooter>)}

      {currentUser.role === UserRole.EMPLOYER && currentUser.id === job.userId && (
      <DropdownMenu>
        <DropdownMenuTrigger disabled={isLoading} onClick={openMenu} className="absolute top-2 right-2">
          <CiMenuKebab size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={edit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={openAlart}>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      )}
    </Card>

    <AlertDailgo isLoading={isLoading} onCancel={onCancel} onSubmit={onSubmit} open={open} title={`delete job`} desc={`are sure you want to delete ${job.title} job`} />
    </>
  )
}
