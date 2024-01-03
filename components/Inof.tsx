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


export default function Info({form, disabled, password}: {password: boolean, form: UseFormReturn<z.infer<typeof RegisterFormSchema>>, disabled: boolean}) {
  return (
    <Form {...form}>
        <form className='space-y-8 flex flex-col' >
        <FormField
        disabled={disabled}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {password && (<FormField
          control={form.control}
          disabled={disabled}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                we segguest a good and long password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />)}

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
