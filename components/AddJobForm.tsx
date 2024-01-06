"use client"
import React, { useEffect, useState } from 'react'
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
import { CalendarIcon, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { modelStore } from '@/hooks/useModel.store'
import { useRouter } from 'next/navigation'
import { jobWithCompanyWIthJobsWithUsers } from '@/types'
import { ScrollArea } from './ui/scroll-area'
import { Card, CardContent } from './ui/card'

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

  const [descriptionArray, setDescripionArray] = useState(isEditing === true && isEditing !== undefined ? job?.description.split("`") : [])
  const [requirementsArray, setreqArray] = useState(isEditing === true && isEditing !== undefined ? job?.requirements.split("`") : [])
  const descriptionText= form.watch("descriptionText");
  const requitrementsText= form.watch("requirementText");

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

  useEffect(() => {
    let desData = "";
    descriptionArray?.forEach((data, index) => {
      if (index === descriptionArray.length - 1) {
        desData += data
      } else {
      desData += `${data}\``
      }
    })
    form.setValue("description", desData);

    let resData = "";
    requirementsArray?.forEach((data, index) => {
      if (index === requirementsArray.length - 1) {
        resData += `${data}`
      } else {
      resData += `${data}\``
      }
    })
    form.setValue("requirements", resData);
  }, [descriptionArray, form, requirementsArray])

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

  const addValue = (value: string | undefined, setSate: any, id: "descriptionText" | "requirementText") => {

    if (value) {
        setSate((prev: any) => [...prev, value])
        form.setValue(id, "");
    }
  }

  const removeValue = (value: string, setSate: any) => {
        setSate((prev: any) => prev.filter((data: any) => data !== value))
  }

  const onKeyPress = (event: any, state: any, id: "descriptionText" | "requirementText") => {
   if (event.key === "Enter") {

    if (id === "descriptionText" && descriptionText) {
    addValue(descriptionText, state, id);
    } else if (id === "requirementText" && requitrementsText) {
    addValue(requitrementsText, state, id);
    }
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
        {descriptionArray && descriptionArray.length > 0  && (
        <ScrollArea className='h-[5vh]'>
        {descriptionArray?.map((data) => (
            <Card key={data}>
              <CardContent className='flex flex-row items-center w-full h-fit py-2'>
                <div className='flex flex-row items-center w-full'>
                    <span className='flex-1 w-full text-md dark:text-white text-white'>{data}</span>
                    <Button variant={"link"}  onClick={() => removeValue(data, setDescripionArray)} className='mx-2'><Trash size={16}  /></Button>
                </div>
              </CardContent>
            </Card>
        ))}
        </ScrollArea>
        )}
        <FormField
        disabled={isLoading}
          control={form.control}
          name="description"
          render={({ field }) => (
            <>
              <FormMessage />
              </>
          )}
        />
        <div className='flex flex-row justify-center items-center w-full h-fit'>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="descriptionText"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>add job description key points</FormLabel>
              <FormControl>
                <Input onKeyPress={(e) => onKeyPress(e, setDescripionArray, "descriptionText")} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='button' className='mx-2 mt-8' onClick={() => addValue(descriptionText, setDescripionArray, "descriptionText")}>add point</Button>
        </div>
       {requirementsArray && requirementsArray.length > 0 && (
       <ScrollArea className='h-[5vh]'>
        {requirementsArray?.map((data) => (
            <Card key={data}>
              <CardContent className='flex flex-row items-center w-full h-fit py-2'>
                <div className='flex flex-row items-center w-full'>
                    <span className='flex-1 w-full text-md dark:text-white text-white'>{data}</span>
                    <Button variant={"link"} onClick={() => removeValue(data, setreqArray)} className='mx-2'><Trash size={16} /></Button>
                </div>
              </CardContent>
            </Card>
        ))}
        </ScrollArea>
       )}
        <FormField
        disabled={isLoading}
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <>
              <FormMessage />
              </>
          )}
        />
        <div className='flex flex-row justify-center items-center'>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="requirementText"
          render={({ field }) => (
            <FormItem className='flex-1 w-full'>
              <FormLabel>add job requrements key points</FormLabel>
              <FormControl>
                <Input onKeyPress={(e) => onKeyPress(e, setDescripionArray, "requirementText")} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='button' className='mx-2 mt-8' onClick={() => addValue(requitrementsText, setreqArray, "requirementText")}>add point</Button>
        </div>
        
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
