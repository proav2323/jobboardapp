"use client"
import React, { useState } from 'react'
import Container from './Container'
import {useForm} from "react-hook-form"
import { LoginFormSchema } from '@/schema/loginFormSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import {signIn} from 'next-auth/react'
import Toast from "react-hot-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from "axios"
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'


export default function LoginForm({redirect}: {redirect?: boolean}) {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const {toast} = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
        setIsLoading(true);
        signIn("credentials", {
            ...values,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);
           if (callback?.ok) {
             Toast.success("logged in")
             router.refresh();
           }

           if (callback?.error) {
           Toast.error(callback.error)
           }
        })
  }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 flex flex-col' >
        <FormField
        disabled={isLoading}
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
        <FormField
          control={form.control}
          disabled={isLoading}
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
        />
        <span className=' w-fit text-md font-light text-blue-500 cursor-pointer hover:underline transition'>Forgot Password</span>
        <Button disabled={isLoading} type="submit">Submit</Button>
        </form>
    </Form>
  )
}
