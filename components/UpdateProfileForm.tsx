"use cleint"

import { RegisterFormSchema } from '@/schema/RegisetFormSchema';
import { UserWithNotApp } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Info from './Inof';
import Resume from './Resume';
import Company from './Company';
import Toast from "react-hot-toast"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { upadtePrfoileSchema } from '@/schema/upadteProfileScehma';
import UpadtedInfo from './upadteInfo';
import UpadteCompany from './UpadteCompanys';
import { modelStore } from '@/hooks/useModel.store';
import { ro } from 'date-fns/locale';


enum steps {
    INFO = 0,
    COMPANY = 1,
    RESUME = 2
}

export default function UpdateProfileForm({currentUser, model}: {currentUser?: UserWithNotApp, model: modelStore}) {

    const role = currentUser?.role;

     const [step, setStep] = useState(steps.INFO);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

    const form = useForm<z.infer<typeof upadtePrfoileSchema>>(
        {
            resolver: zodResolver(upadtePrfoileSchema),
            defaultValues: {
                Name: currentUser?.Name,
                resume: role === UserRole.JOB_SEEKER ? currentUser?.resume! : undefined,
                companyName: role === UserRole.EMPLOYER && currentUser?.company ? currentUser?.company.name : undefined,
                companyIndustry: role === UserRole.EMPLOYER && currentUser?.company ? currentUser?.company.industry : undefined,
                companyDescription: role === UserRole.EMPLOYER && currentUser?.company ? currentUser?.company.description : undefined
            }
        }
    )
  if (!currentUser || !currentUser.company) {
    return null;
  }

    const resume = form.watch("resume");

    let BodyContent = (
        <UpadtedInfo password={false} form={form} disabled={isLoading} />
    );

    if (step === steps.RESUME) {
        BodyContent = (
            <Resume resume={resume} disabled={isLoading} onChange={(id: "resume", value: UserRole | string) => setCustomValue(id, value)} />
        );
    }

        const setCustomValue = (id: "resume", value: UserRole | string) => {
         form.setValue(id, value);
    }

   if (step === steps.COMPANY) {
        BodyContent = (
            <UpadteCompany companyId={false} form={form} disabled={isLoading} onChange={(id: "resume", value: UserRole | string) => setCustomValue(id, value)} />
        );
    }

        const back = () => {
             setStep(steps.INFO);
    }

        const onSubmit = (values: z.infer<typeof upadtePrfoileSchema>) => {

        if (step !== steps.COMPANY && step !== steps.RESUME) {
          if (step === steps.INFO) {
            if (role === UserRole.EMPLOYER) {
                return setStep(steps.COMPANY);
            } else if (role === UserRole.JOB_SEEKER) {
                return setStep(steps.RESUME);
            }
          }
        }

   if (role === UserRole.JOB_SEEKER && !resume) {
    return Toast.error("provide a resume");
   }

   
   if (role === UserRole.EMPLOYER && ((!form.getValues("companyIndustry") || !form.getValues("companyDescription") || !form.getValues("companyName")))) {
    return Toast.error("provide a Company Where you work");
   }
   setIsLoading(true);
   axios.put("/api/profile", values).then(() => {
     Toast.success("profiel upadted");
     model.onClose();
     router.refresh();
   }).catch((err) => {
     Toast.error(err.response.data);
   }).finally(() => {
    setIsLoading(false);
   })
    }

    if (!currentUser) {
        return null;
    }
  return (
    <div className='w-full flex flex-col'>
     {BodyContent}
     <div className='flex flex-row justify-between items-center w-full pt-10'>
        {/* <form className='flex flex-row justify-between items-center w-full pt-10' onSubmit={(e) => role === UserRole.EMPLOYER ? step < steps.COMPANY ? onNext(e) : form.handleSubmit(onSubmit) : step < steps.RESUME ? onNext(e) : form.handleSubmit(onSubmit)} > */}
                  {step > steps.INFO && (<Button disabled={isLoading} type='button' onClick={back} className='w-[98%] m-2' variant={"secondary"}>Back</Button>)}
        <Button disabled={isLoading} onClick={form.handleSubmit(onSubmit)} className='w-[98%]' variant={"default"}>{role === UserRole.EMPLOYER ? step < steps.COMPANY ? "Next" : "update" : step < steps.RESUME ? "Next" : "update"}</Button>
        {/* </form> */}
     </div>
    </div>
  )
}
