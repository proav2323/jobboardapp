"use client"
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Company } from '@prisma/client'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { comapnyIndustries } from './Company'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { ScrollArea } from './ui/scroll-area'

export default function CompanyFilters({}: {}) {
    
    const [companies, setCompanies] = useState<Company[]>([])
    const searchParams = useSearchParams();
    const [open, setIsOpne] = useState(false);
    const comapnySlected = searchParams?.get("companyName");
    const indusyrtselected = searchParams?.get("companyIndustry");
    const router =  useRouter()

    const popRef = useRef(null);

    useEffect(() => {
        axios.get("/api/company").then((data) => {
          setCompanies(data.data);
        })
    }, [])

    const onClick = () => {
      setIsOpne(true);
    }

    const select = (params: string, comapnySlected: boolean, value?: string, ) => {

        let oldUrl = new URL(`/jobs`, process.env.NEXT_URL);
        
        if (searchParams?.get("companyName")) {
            oldUrl.searchParams.set("companyName", searchParams?.get("companyName")!)
        }

        if (searchParams?.get("companyIndustry")) {
            oldUrl.searchParams.set("companyIndustry", searchParams?.get("companyIndustry")!)
        }

        const searchparams = new URLSearchParams(oldUrl.search);
        
        if (!comapnySlected && value) {
       searchparams.set(params, value);

       let url = "/jobs?"
       searchparams.forEach((value, key) => {
         url += `${key}=${value}&`
       })
       router.push(url);

      } else {
        searchparams.delete(params);
       let url = "/jobs?"
       searchparams.forEach((value, key) => {
         url += `${key}=${value}&`
       })
       router.push(url);
        }

    }


  return (
    <>
    <div className='hidden md:flex md:flex-col gap-2'>
      <div className='flex-[0.5] w-full'>
    <Card>
        <CardHeader>
            <CardTitle>Company</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
                 {companies.map((com) => (
                    <Button onClick={() => select("companyName", comapnySlected === com.name ,com.name)} className={cn("", comapnySlected === com.name ? " opacity-70" : "opacity-100")} key={com.id}>{com.name}</Button>
                 ))}
            </div>
        </CardContent>
    </Card>
</div>
<div className='flex-[0.5] w-full'>
        <Card>
        <CardHeader>
            <CardTitle>Company Industries</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
                 {comapnyIndustries.map((com) => (
                    <Button onClick={() => select("companyIndustry", indusyrtselected === com ,com)} className={cn("", indusyrtselected === com ? " opacity-70" : "opacity-100")} key={com}>{com}</Button>
                 ))}
            </div>
        </CardContent>
    </Card>
    </div>
    </div>

    <div className='w-full flex flex-row justify-center items-center gap-2 md:hidden'>
      <Popover>
        <PopoverTrigger>
           <Button>filters</Button>
        </PopoverTrigger>
        <PopoverContent>
           <span className='my-3 text-lg font-bold'>Company</span>
            <ScrollArea className='grid grid-cols-2 md:grid-cols-2 gap-2 w-full h-40'>
                 {companies.map((com) => (
                    <Button onClick={() => select("companyName", comapnySlected === com.name ,com.name)} className={cn("", comapnySlected === com.name ? " opacity-70" : "opacity-100")} key={com.id}>{com.name}</Button>
                 ))}
            </ScrollArea>
            <span className='my-3 text-lg font-bold'>Company Industry</span>
          <ScrollArea className='h-40 w-full'>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-2 w-full h-full'>
                 {comapnyIndustries.map((com) => (
                    <Button onClick={() => select("companyIndustry", indusyrtselected === com ,com)} className={cn("", indusyrtselected === com ? " opacity-70" : "opacity-100")} key={com}>{com}</Button>
                 ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
    </>
  )
}
