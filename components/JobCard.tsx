"use client"
import { Job, User } from '@prisma/client'
import React, { MouseEventHandler } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { format } from 'date-fns'
import { Button } from './ui/button'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function JobCard({job, currentUser}: {job: Job, currentUser: User}) {
    const router = useRouter();

    const apply = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.stopPropagation();
     event.preventDefault();


    }

    const save = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.stopPropagation();
     event.preventDefault();

    }
  return (
    <Card className='w-[90vw] md:w-[300px] cursor-pointer' onClick={() => router.push(`/job/${job.id}`)}>
        <CardHeader>
          <CardTitle className='mx-auto'>{job.title}</CardTitle>
        </CardHeader>
     <CardContent className='flex flex-col gap-2 w-full'>
         <CardDescription>Deadline: {format(job.deadline, "MM/dd/yyyy")}</CardDescription>
     </CardContent>
      <CardFooter className='flex justify-between'>
            <Button onClick={save} variant={"outline"} className='gap-2'> <Save size={24} /> Save Job</Button>
            <Button onClick={apply}>Apply</Button>
      </CardFooter>
    </Card>
  )
}
