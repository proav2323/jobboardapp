"use client"

import { useModal } from '@/hooks/useModel.store'
import React from 'react'
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

export default function LoginModels() {
  const model = useModal();
  const isOpen = model.isOpen && model.type === "Login";
  const handleClose = () => {
     model.onClose();
  }
  return (
  <Dialog open={isOpen} onOpenChange={handleClose}>
  <DialogContent>
      <Tabs defaultValue='login' className='pt-10'>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">login</TabsTrigger>
        <TabsTrigger value="sign up">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value='login'>
        <LoginForm redirect={false} />
      </TabsContent>
      <TabsContent value='sign up'>
        <RegisterForm redirect={false} />
      </TabsContent>
      </Tabs>
  </DialogContent>
   </Dialog>
  )
}
