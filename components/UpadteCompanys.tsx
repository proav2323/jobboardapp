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

export default function UpadteCompany({form, disabled, onChange, companyId}: {form: UseFormReturn<z.infer<typeof upadtePrfoileSchema>>, disabled: boolean, onChange: (id: "resume", value: UserRole | string) => void, companyId: boolean}) {
  const [countries, setCountries] = useState<Company[]>([])

  useEffect(() => {
  axios.get("/api/company").then((data) => {
    setCountries(data.data);
    console.log(data.data);
  })
  }, [])
  return (
    <div className='w-full flex flex-col'>
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
