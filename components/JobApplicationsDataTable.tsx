"use client"
import { appailcatios } from '@/types'
import React, { useState } from 'react'
import { ColumnDef, flexRender,
  getCoreRowModel,
  useReactTable, } from "@tanstack/react-table"

  import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { MoreHorizontal, Trash } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function JobApplicationsDataTable({jobApp}: {jobApp: appailcatios[]}) {

     const router = useRouter();
     const [loading, setIsLoading] = useState(false);
     const [loadingId, setLoadingId] = useState("");

  const deleteApp = (jobId: string, appId: string) => {
    setIsLoading(true);
    setLoadingId(jobId);
    axios.delete(`/api/job/${jobId}/application/${appId}`).then((data) => {
     toast.success("application removed");
     router.refresh();
     console.log("ju")
   }).catch((err) => {
    toast.error(err.message)
    console.log(err);
   }).finally(() => {
    setIsLoading(false);
    setLoadingId("");
   })
  }

  return (
 <div className="rounded-md border w-[98%] mx-auto">
      <Table>
        <TableHeader>
           <TableRow>
           <TableHead>user name</TableHead>
           <TableHead>job name</TableHead>
           <TableHead>company name</TableHead>
           <TableHead>status</TableHead>
           </TableRow>
        </TableHeader>
        <TableBody>
          {jobApp.map((data) => (
         <TableRow key={data.id}>
            <TableCell className="font-medium">{data.user.Name}</TableCell>
            <TableCell>{data.job.title}</TableCell>
            <TableCell>{data.job.company.name}</TableCell>
            <TableCell>{data.status}</TableCell>
            <TableCell><Button disabled={loading && loadingId === data.jobId} className='cursor-pointer' variant={"link"} onClick={() => deleteApp(data.jobId, data.id)}><Trash size={16} /></Button></TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
