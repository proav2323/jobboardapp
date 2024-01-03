"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import {AddJobSchema} from "../schema/addJobScehema"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {format} from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'
import { CalendarIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { modelStore } from '@/hooks/useModel.store'
import { useRouter } from 'next/navigation'
import { jobWithCompanyWIthJobsWithUsers } from '@/types'

export default function AddJobForm({model, isEditing, job}: {model: modelStore, isEditing?: boolean, job?: jobWithCompanyWIthJobsWithUsers}) {
  const currentDate = new Date();
  const tomorowwDate = new Date();
  tomorowwDate.setDate(currentDate.getDate() + 1);
  const form = useForm<z.infer<typeof AddJobSchema>>({
    resolver: zodResolver(AddJobSchema),
    defaultValues: {
       title: isEditing === true && isEditing !== undefined ? job?.title :"",
       description: isEditing === true && isEditing !== undefined ? job?.description :"",
       requirements: isEditing === true && isEditing !== undefined ? job?.requirements :"",
       deadline: isEditing === true && isEditing !== undefined ? job?.deadline : tomorowwDate
    }
  });

  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const date = form.watch("deadline");

  const setdate = (value?: Date) => {
    if (!value || new Date(Date.now()) > new Date(value)) {
      if (value) {
        toast.error("can't choose date bellow toady as deadline")
      }
      return;
    }

    form.setValue("deadline", value);
  }

  const onSubmit = (values: z.infer<typeof AddJobSchema>) => {

    if (isEditing === false || isEditing === undefined) {
   setIsLoading(true);
   axios.post("/api/job", values).then(() => {
    form.reset();
    model.onClose();
    toast.success("job added");
    router.refresh();
   }).catch((err) => {
    toast.error(err.response.data)
   }).finally(() => {
    setIsLoading(false);
   })
    } else {
   setIsLoading(true);
   axios.put(`/api/job/${job?.id}/update`, values).then(() => {
    form.reset();
    model.onClose();
    toast.success("job edited");
    router.refresh();
   }).catch((err) => {
    toast.error(err.response.data)
   }).finally(() => {
    setIsLoading(false);
   })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 flex flex-col w-full'>
       <FormField
        disabled={isLoading}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>job title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
               <FormField
        disabled={isLoading}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>job description</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                use : for differnt bullect points
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
        disabled={isLoading}
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>job requirements</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                use : for differnt bullect points
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col w-full gap-2'>
      <span className={cn("text-md",  isLoading ? "text-neutral-600 dark:text-neutral-400" : 'dark:text-white text-black')}>Job Deadline Date</span>
      <Popover>
      <PopoverTrigger asChild>
        <Button
        disabled={isLoading}
          variant={"outline"}
          type='button'
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Calendar
        disabled={isLoading}
          mode="single"
          selected={date}
          onSelect={(value) => setdate(value)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
          </div>
    <Button disabled={isLoading} type='submit'>{isEditing === true && isEditing !== undefined ? "Save" : "Add"}</Button>
      </form>
    </Form>
  )
}
