"use client"

import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input';
import { RegisterFormSchema } from '@/schema/RegisetFormSchema';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Company, UserRole } from '@prisma/client';
import { Separator } from './ui/separator';
import { upadtePrfoileSchema } from '@/schema/upadteProfileScehma';

export const comapnyIndustries = [
  "food",
  "computer",
  "grocerries",
  "store",
  "beauty",
  "clothes",
  "fashion",
  "games",
  "electronics",
  "eccentials store",
  "middle school",
  "high school",
  "university",
  "school",
  "other"
]

export default function Company({form, disabled, onChange, companyId}: {form: UseFormReturn<z.infer<typeof RegisterFormSchema>>, disabled: boolean, onChange: (id: "role" | "resume" | "companyId" | "companyIndustry", value: UserRole | string) => void, companyId: boolean}) {
  const [countries, setCountries] = useState<Company[]>([])

  useEffect(() => {
  axios.get("/api/company").then((data) => {
    setCountries(data.data);
    console.log(data.data);
  })
  }, [])
  return (
    <div className='w-full flex flex-col'>
    {companyId === true && (
    <Select onValueChange={(value) => onChange("companyId", value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your company" />
      </SelectTrigger>
      <SelectContent className='w-full'>
        <SelectGroup>
             {countries.map((data) => (
              <SelectItem key={data.id} value={data.id}>{data.name}</SelectItem>
             ))}
        </SelectGroup>
      </SelectContent>
      <Separator className='mt-2'></Separator>
      <span className='font-light mt-3 text-md mb-3'>Or Create your company</span>
    </Select>
      )}
      <Select onValueChange={(value) => onChange("companyIndustry", value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your company industry" />
      </SelectTrigger>
      <SelectContent className='w-full'>
        <SelectGroup>
             {comapnyIndustries.map((data) => (
              <SelectItem key={data} value={data}>{data}</SelectItem>
             ))}
        </SelectGroup>
      </SelectContent>
      <Separator className='mt-2'></Separator>
    </Select>
        <Form {...form}>
        <form className='space-y-8 flex flex-col' >
        <FormField
        disabled={disabled}
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={disabled}
          name="companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Description</FormLabel>
              <FormControl>
                <Input type='text' placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </form>
    </Form>
  </div>
  )
}
