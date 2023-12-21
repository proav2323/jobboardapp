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
import { Search, User2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';

export default function Navbar({currentUser}: {currentUser: User | null}) {

  const [doBackground, setDoBackground] = useState(false);
  const model = useModal();

  useEffect(() => {
    window.addEventListener("scroll", () => {
     setDoBackground(window.scrollY > 30 ? true : false);
    })
  }, [])

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
    {currentUser.role === UserRole.JOB_SEEKER && (<Popover>
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <User2 size={34} className='cursor-pointer hover:opacity-80 transition p-2 bg-white dark:bg-neutral-700/30 rounded-full' />
      </DropdownMenuTrigger>
       <DropdownMenuContent className='w-56 text-black dark:text-white'>
        <DropdownMenuLabel>{currentUser.Name}</DropdownMenuLabel>
          <DropdownMenuGroup>
            {currentUser.role === UserRole.JOB_SEEKER && (<DropdownMenuItem onClick={() => {}}>Update Your Resume</DropdownMenuItem>)}
            {currentUser.role === UserRole.JOB_SEEKER ? (<DropdownMenuItem onClick={() => {}}>your job applicants</DropdownMenuItem>) : (<DropdownMenuItem onClick={() => model.onOpen("addJob")}>add a new job</DropdownMenuItem>)}
            <DropdownMenuItem onClick={() => {}}>update your profile</DropdownMenuItem>
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
