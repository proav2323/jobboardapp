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
import AddJobForm from '../AddJobForm';
import Heading from '../Heading';


export default function AddJob() {
  const model = useModal();
  const isOpen = model.isOpen && model.type === "addJob"
  return (
  <Dialog open={isOpen} onOpenChange={() => model.onClose()}>
   <DialogContent>
    <Heading title='Add A New Job' subtitle='ned to hire someone for partiular job?' center />
       <AddJobForm model={model} />
    </DialogContent>
   </Dialog>
  )
}
