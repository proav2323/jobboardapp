"use client"
import { User, UserRole } from '@prisma/client'
import React from 'react'
import Heading from './Heading'
import Image from 'next/image'
import { Button } from './ui/button'
import { useModal } from '@/hooks/useModel.store'
import { useRouter } from 'next/navigation'

export default function Hero({currentUser}: {currentUser: User}) {
    const model = useModal();
    const router = useRouter();
  return (
    <>
    {currentUser.role === UserRole.JOB_SEEKER ? (
    <div className='flex flex-col md:flex-row justify-center items-center w-full h-[100vh] relative'>
        <Image src={"/drawing277.jpg"}  alt='hero' fill style={{objectFit: "cover"}}/>
        <div className='w-full absolute h-full bg-black/80 top-0 left-0' />
        <div className='flex flex-col flex-1 w-full absolute m-auto text-white'>
            <Heading title='find jobs that suits you' subtitle='Looking For A job?' center />
            <Button onClick={() => router.push("/jobs")} variant="default" className='md:w-[10%] w-[90%] m-auto mt-3'>Browse Jobs</Button>
        </div>
    </div>
    ) : (
    <div className='flex flex-col md:flex-row justify-center items-center w-full h-[100vh] relative'>
        <Image src={"/addJob.jpg"}  alt='hero' fill style={{objectFit: "cover"}}/>
        <div className='w-full absolute h-full bg-black/80 top-0 left-0' />
        <div className='flex flex-col flex-1 w-full absolute m-auto text-white'>
            <Heading title='find job seekers that you want' subtitle='want to hire staff' center />
            <Button variant="default" className='md:w-[10%] w-[90%] m-auto mt-3' onClick={() => model.onOpen("addJob")}>Add Job</Button>
        </div>
    </div>
    )}
    </>
  )
}
