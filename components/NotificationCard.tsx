import { notifcatioType } from '@/types'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { format } from 'date-fns'

export default function NotificationCard({notification}: {notification: notifcatioType}) {
  return (
    <Card className='w-full flex my-2 py-2 cursor-pointer'>
      <CardContent className='w-full flex flex-col'>
         <span className='text-md font-semi-bold'>{notification.message}</span>
         <div className='flex flex-row items-center mt-3'>
          <span className='ml-auto text-sm dark:text-neutral-500 text-neutral-300'>recieaved at: {format(notification.CreatedAt, "MM/dd/yyyy")}</span>
         </div>
      </CardContent>
    </Card>
  )
}
