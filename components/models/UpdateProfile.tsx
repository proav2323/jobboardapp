"use client"
import { useModal } from '@/hooks/useModel.store'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import UpdateProfileForm from '../UpdateProfileForm';
import Heading from '../Heading';

export default function UpdateProfile() {
    const model = useModal();
    const isOpen = model.type === "updateProfile" && model.isOpen;
    const {currentUser} = model.data;
  return (
    <Dialog open={isOpen} onOpenChange={() => model.onClose()}>
        <DialogContent>
          <Heading title='Edit Profile' subtitle='want to change your name' center />
              <UpdateProfileForm model={model} currentUser={currentUser} />
        </DialogContent>
    </Dialog>
  )
}
