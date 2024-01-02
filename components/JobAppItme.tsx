"use client"
import { appailcatios } from '@/types'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { ApplicationStatus, User } from '@prisma/client'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'



export default function JobAppItem({app, currentUser}: {app: appailcatios, currentUser: User}) {

    const [isLaoding, setIsLoading] = useState(false)
    const router = useRouter();

    const rejectNotificationMessage = `your job application on ${app.job.title} job has been rejected`
    const acceptNotificationMessage = `your job application on ${app.job.title} job has been accepted, see your mail`
    const inReviewNotificationMessage = `your job application on ${app.job.title} job has been on review, we will get bakc to you later`


    const changeStatus = (status: ApplicationStatus, jobId: string, appId: string, clientId: string, clientEmail: string, title: string) => {
       setIsLoading(true);

       const message = status === ApplicationStatus.IN_REVIEW ? inReviewNotificationMessage : status === ApplicationStatus.ACCEPTED ? acceptNotificationMessage : rejectNotificationMessage;

       axios.put(`/api/job/${jobId}/application/${appId}`, {status: status, clientId: clientId, message}).then(() => {
       toast.success("status chnaged and email sent")
        router.refresh();
       }).catch((err) => {
        toast.error(err.response.data)
       }).finally(() => {
        setIsLoading(false);
       })
    }

  return (
    <Card className='w-full flex flex-col justify-center items-center py-4 my-2'>
        <CardContent className='flex flex-col w-full gap-2'>
             <div className='flex flex-row justify-between items-center w-full'>
                <div className='flex flex-col gap-1'>
                    <span className='dark:text-white text-black text-lg'>{app.user.Name}</span>
                    <span className='dark:text-neutral-600 text-neutral-400 text-sm hidden md:block'>{app.user.email}</span>
                </div>
                <a href={app.user.resume ?? ""} className='dark:text-white text-neutral-900 text-md hover:underline'>See User Resume</a>
             </div>
             <div className='md:flex flex-row justify-between items-center mt-4 grid grid-cols-2 gap-2'>
                <Button onClick={() => changeStatus(ApplicationStatus.IN_REVIEW, app.jobId, app.id, app.userId, app.user.email, app.job.title)} disabled={isLaoding || app.status === ApplicationStatus.IN_REVIEW}>In Review</Button>
                <Button onClick={() => changeStatus(ApplicationStatus.ACCEPTED, app.jobId, app.id, app.userId, app.user.email, app.job.title)} disabled={isLaoding || app.status === ApplicationStatus.ACCEPTED}>Accept</Button>
                <Button onClick={() => changeStatus(ApplicationStatus.REJECTED, app.jobId, app.id, app.userId, app.user.email, app.job.title)} disabled={isLaoding || app.status === ApplicationStatus.REJECTED}>Reject</Button>
             </div>
        </CardContent>
    </Card>
  )
}
