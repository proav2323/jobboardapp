"use client"
import { useModal } from '@/hooks/useModel.store';
import { User } from '@prisma/client'
import React, { useEffect } from 'react'
import { Button } from './ui/button';

export default function Navbar({currentUser}: {currentUser: User | null}) {

  const model = useModal();

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      Navbar
      <Button onClick={() => model.onOpen("Login")} />
    </div>
  )
}
