"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { GiOccupy } from "react-icons/gi";

export default function Logo() {
    const router = useRouter();
  return (
    <div className='flex flex-row justify-center items-center gap-2 cursor-pointer hover:opacity-80 transition' onClick={() => router.push("/")}>
        <GiOccupy size={34} className="dark:text-white text-black" />
        Job Board
    </div>
  )
}
