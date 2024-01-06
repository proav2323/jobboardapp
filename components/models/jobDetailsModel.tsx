"use client"

import { useModal } from '@/hooks/useModel.store'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { AlertDialogHeader } from '../ui/alert-dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import toast from 'react-hot-toast';
import { UserRole } from '@prisma/client';
import Heading from '../Heading';
import JobSeekerJobDetails from '../JobSeekerJobDetails';
import EmployerJobDetails from '../EmployerJobDetails';
import { RiAdminLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';


export default function JobDetailsModel() {

  const model = useModal();
  let isOpen = model.isOpen && model.type === "JobDeatials"
  const {currentUser, job} = model.data;
  const [employerView, setEmloyerView] = useState(currentUser?.role === UserRole.EMPLOYER);

    useEffect(() => {
  if (currentUser?.role === UserRole.EMPLOYER) {
    setEmloyerView(true);
  }
  }, [currentUser?.role])

  if (!currentUser || !job) {
    isOpen = false;
    return null;
  }

  const changeValue = (value: boolean) => {
    setEmloyerView(value);
  }

  return (
  <Dialog open={isOpen} onOpenChange={() => model.onClose()}>
   <DialogContent>
    <DialogHeader className='flex flex-row justify-between items-center'>
      <Heading title={job.title} subtitle={`${job.title} job details`} />
      <div className='flex flex-row items-center'>
        <TooltipProvider>
          <Tooltip>
          <TooltipTrigger>
        <button className={` ${employerView === true ? "dark:bg-neutral-700 bg-neutral-500 flex items-center justify-center"  : "dark:bg-neutral-500 bg-neutral-300"} p-2 h-10 w-10 rounded-l-md transition`} onClick={() => changeValue(true)}><RiAdminLine size={16} /></button>
          </TooltipTrigger>
          <TooltipContent>
            Click here to switch to employer view
          </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
        <button className={`${employerView === false ? "dark:bg-neutral-700 bg-neutral-500"  : "dark:bg-neutral-500 bg-neutral-300"} p-2 h-10 w-10 flex items-center justify-center rounded-r-md transition`}  onClick={() => changeValue(false)}><CiUser size={16} /></button>
            </TooltipTrigger>
            <TooltipContent>
            Click here to switch to job seeker view
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </DialogHeader>
        {currentUser.role === UserRole.EMPLOYER ? (
          <>
          {employerView === true ? (
           <EmployerJobDetails job={job} currentUser={currentUser} />
          ) : (
             <JobSeekerJobDetails disabled={true} job={job} />
          )}
        </>
        ) : (
          <JobSeekerJobDetails job={job} />
        )}
    </DialogContent>
   </Dialog>
  )
}
