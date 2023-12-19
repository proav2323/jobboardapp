"use client"
import React, { useState } from 'react'
import { Button } from './ui/button';
import Info from './Inof';
import Role from './Role';
import Resume from './Resume';
import Company from './Company';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { RegisterFormSchema } from '@/schema/RegisetFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import axios from 'axios';
import Toast from "react-hot-toast"
import { useRouter } from 'next/navigation';
import { ScrollArea } from './ui/scroll-area';


enum steps {
    INFO = 0,
    ROLE = 1,
    RESUME = 2,
    COMPANY = 3,
}
export default function RegisterForm({redirect}: {redirect: boolean}) {
    const [step, setStep] = useState(steps.INFO);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

    const form = useForm<z.infer<typeof RegisterFormSchema>>(
        {
            resolver: zodResolver(RegisterFormSchema),
            defaultValues: {
                companyName: "",
                companyDescription: "",
                companyIndustry: "",
                email: "",
                password: "",
                Name: "",
                role: UserRole.JOB_SEEKER,
                resume: "",
                companyId: "",
            }
        }
    )

    const role = form.watch("role");
    const resume = form.watch("resume");

    let BodyContent = (
        <Info form={form} disabled={isLoading} />
    );

    if (step === steps.ROLE) {
        BodyContent = (
          <div className='w-full'>
            <Role role={role} disabled={isLoading} onChange={(id: "role" | "resume" | "companyId", value: UserRole | string) => setCustomValue(id, value)} />
          </div>
        );
    }

        if (step === steps.RESUME) {
        BodyContent = (
            <Resume resume={resume} disabled={isLoading} onChange={(id: "role" | "resume" | "companyId", value: UserRole | string) => setCustomValue(id, value)} />
        );
    }

   if (step === steps.COMPANY) {
        BodyContent = (
            <Company form={form} disabled={isLoading} onChange={(id: "role" | "resume" | "companyId", value: UserRole | string) => setCustomValue(id, value)} />
        );
    }

    const onSubmit = (values: z.infer<typeof RegisterFormSchema>) => {

        if (step !== steps.COMPANY && step !== steps.RESUME) {
          if (step === steps.ROLE) {
            if (role === UserRole.EMPLOYER) {
                return setStep(steps.COMPANY);
            } else if (role === UserRole.JOB_SEEKER) {
                return setStep(steps.RESUME);
            }
          } else {
            return setStep((step) => step + 1);
          }
        }

   if (role === UserRole.JOB_SEEKER && !resume) {
    return Toast.error("provide a resume");
   }
   
   if (role === UserRole.EMPLOYER && (!form.getValues("companyId") && (!form.getValues("companyIndustry") || !form.getValues("companyDescription") || !form.getValues("companyName")))) {
    console.log(form.getValues("companyIndustry"))
    return Toast.error("provide a Company Where you work");
   }
   setIsLoading(true);
   axios.post("/api/register", values).then(() => {
     Toast.success("register successfull");
    if (redirect) {
      router.push('/');
     } else {
     router.refresh();
     }
   }).catch((err) => {
     Toast.error(err.response.data);
   }).finally(() => {
    setIsLoading(false);
   })
    }

    const onNext = (e: React.FormEvent<HTMLFormElement>) => {
    }

    const back = () => {
        if (step === steps.COMPANY) {
             setStep(steps.ROLE);
          } else {
            setStep((step) => step - 1);
          }  
    }

    const setCustomValue = (id: "role" | "resume" | "companyId", value: UserRole | string) => {
         form.setValue(id, value);
    }

  return (
    <div className='w-full flex flex-col'>
     {BodyContent}
     <div className='flex flex-row justify-between items-center w-full pt-10'>
        {/* <form className='flex flex-row justify-between items-center w-full pt-10' onSubmit={(e) => role === UserRole.EMPLOYER ? step < steps.COMPANY ? onNext(e) : form.handleSubmit(onSubmit) : step < steps.RESUME ? onNext(e) : form.handleSubmit(onSubmit)} > */}
                  {step >= steps.ROLE && (<Button type='button' onClick={back} className='w-[98%] m-2' variant={"secondary"}>Back</Button>)}
        <Button onClick={form.handleSubmit(onSubmit)} className='w-[98%]' variant={"default"}>{role === UserRole.EMPLOYER ? step < steps.COMPANY ? "Next" : "Create" : step < steps.RESUME ? "Next" : "Create"}</Button>
        {/* </form> */}
     </div>
    </div>
  )
}
