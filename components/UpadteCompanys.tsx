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
import { comapnyIndustries } from './Company';

export default function UpadteCompany({form, disabled, onChange, companyId}: {form: UseFormReturn<z.infer<typeof upadtePrfoileSchema>>, disabled: boolean, onChange: (id: "resume" | "companyIndustry", value: UserRole | string) => void, companyId: boolean}) {
  const [countries, setCountries] = useState<Company[]>([])

  useEffect(() => {
  axios.get("/api/company").then((data) => {
    setCountries(data.data);
    console.log(data.data);
  })
  }, [])
  return (
    <div className='w-full flex flex-col'>
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
          control={form.control}
          disabled={disabled}
          name="companyIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>company Industry</FormLabel>
              <FormControl>
                <Input type='text' placeholder="" {...field} />
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
