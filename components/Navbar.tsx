"use client"
import { useModal } from '@/hooks/useModel.store';
import { User, UserRole } from '@prisma/client'
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/button';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { ModeToggle } from './ThemeToggle';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Bell, Search, User2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { UserWithNotApp } from '@/types';
import { ScrollArea } from './ui/scroll-area';
import NotificationCard from './NotificationCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { upadteSteps } from './UpdateProfileForm';

export default function Navbar({currentUser}: {currentUser: UserWithNotApp | null}) {

  const [doBackground, setDoBackground] = useState(false);
  const notSeenNott = currentUser?.notifications.filter((not) => not.seen === false)
  const [notSeenNot, setNotSeen] = useState(notSeenNott);
  const model = useModal();
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
     setDoBackground(window.scrollY > 30 ? true : false);
    })
  }, [])

  const changeNotifications = () => {
    axios.put("/api/notification",).then(() => {
      router.refresh();
      setNotSeen([])
    }).catch((er) => {
      console.log(er)
    })
  }

  if (!currentUser) {
    return null;
  }

const SignOut = async() => {
  await signOut();
}


  return (
    <div className={cn(` z-50 drop-shadow-lg transition duration-300 ease-in-out flex flex-row justify-between items-center p-4 w-full fixed top-0`, doBackground? "dark:bg-neutral-900/50 bg-neutral-300" : "bg-transparent")}>
      <Logo  />
  <div className='flex flex-row items-center gap-2'>
    {currentUser.role === UserRole.JOB_SEEKER && (
    <Popover>
      <PopoverTrigger>
        <Search size={34} className='cursor-pointer hover:opacity-80 transition p-2 bg-white dark:bg-neutral-700/30 rounded-full' />
      </PopoverTrigger>
      <PopoverContent className='md:w-[35vw] w-[85vw]'>
      <div className='flex flex-row w-full items-center gap-2'>
         <input placeholder='Search' type='text' className=' rounded-md flex-1 bg-transparent w-full p-4 focus:border-neutral-900 dark:focus:border-white border-[1px] ' />
         <Button><Search /></Button>
      </div>
      </PopoverContent>
    </Popover>)}

        {currentUser.role === UserRole.JOB_SEEKER && (
    <Popover>
      <PopoverTrigger className=''>
        <div onClick={changeNotifications} className='relative flex flex-col items-center'>
        <Bell size={34} className='cursor-pointer hover:opacity-80 transition p-2 bg-white dark:bg-neutral-700/30 rounded-full' />
        {notSeenNot && notSeenNot.length !== 0 && (<span className='absolute text-[9px] text-white bg-red-500 rounded-full py-1 px-2 -top-[1] right-0'>{notSeenNot.length}</span>)}
        </div>
      </PopoverTrigger>
      <PopoverContent className='md:w-[35vw] w-[85vw] h-[35vh]'>
      <div className='flex flex-row w-full items-center gap-2'>
         <ScrollArea className='w-full h-[30vh]'>
          {currentUser.notifications.map((not) => (
             <NotificationCard notification={not} key={not.id} />
          ))}
         </ScrollArea>
      </div>
      </PopoverContent>
    </Popover>)}

    <DropdownMenu>
      <DropdownMenuTrigger>
        <User2 size={34} className='cursor-pointer hover:opacity-80 transition p-2 bg-white dark:bg-neutral-700/30 rounded-full' />
      </DropdownMenuTrigger>
       <DropdownMenuContent className='w-56 text-black dark:text-white'>
        <DropdownMenuLabel>{currentUser.Name}</DropdownMenuLabel>
          <DropdownMenuGroup>
            {currentUser.role === UserRole.JOB_SEEKER && (<DropdownMenuItem onClick={() => model.onOpen("updateProfile", {currentUser: currentUser, step: upadteSteps.RESUME})}>Update Your Resume</DropdownMenuItem>)}
            {currentUser.role === UserRole.JOB_SEEKER && (<DropdownMenuItem onClick={() => {}}>see your saves jobs</DropdownMenuItem>)}
            {currentUser.role === UserRole.JOB_SEEKER ? (<DropdownMenuItem onClick={() => {}}>your job applicants</DropdownMenuItem>) : (<DropdownMenuItem onClick={() => model.onOpen("addJob")}>add a new job</DropdownMenuItem>)}
            <DropdownMenuItem onClick={() => model.onOpen("updateProfile", {currentUser: currentUser})}>update your profile</DropdownMenuItem>
          </DropdownMenuGroup>
        <DropdownMenuSeparator />
           <DropdownMenuGroup>
            <DropdownMenuItem onClick={SignOut}>Logout</DropdownMenuItem>
           </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
        <ModeToggle />
      </div>
    </div>
  )
}
