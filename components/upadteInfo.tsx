"use client"
import { RegisterFormSchema } from '@/schema/RegisetFormSchema';
import React from 'react'
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
import { upadtePrfoileSchema } from '@/schema/upadteProfileScehma';


export default function UpadtedInfo({form, disabled, password}: {password: boolean, form: UseFormReturn<z.infer<typeof upadtePrfoileSchema>>, disabled: boolean}) {
  return (
    <Form {...form}>
        <form className='space-y-8 flex flex-col' >
        <FormField
          control={form.control}
          disabled={disabled}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder="John Roger" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </form>
    </Form>
  )
}
