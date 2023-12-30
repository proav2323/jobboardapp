"use client"

import { useModal } from '@/hooks/useModel.store'
import React, { useState } from 'react'
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


export default function JobDetailsModel() {

  const model = useModal();
  let isOpen = model.isOpen && model.type === "JobDeatials"
  const {currentUser, job} = model.data;

  if (!currentUser || !job) {
    isOpen = false;
    return null;
  }

  return (
  <Dialog open={isOpen} onOpenChange={() => model.onClose()}>
   <DialogContent>
    <DialogHeader>
      <Heading title={job.title} subtitle={`${job.title} job details`} />
    </DialogHeader>
        {currentUser.role === UserRole.EMPLOYER ? (
          <EmployerJobDetails />
        ) : (
          <JobSeekerJobDetails job={job} />
        )}
    </DialogContent>
   </Dialog>
  )
}
