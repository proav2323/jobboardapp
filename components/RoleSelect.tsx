"use client"

import { UserRole } from '@prisma/client'
import React, { useCallback } from 'react'
import Heading from './Heading'

export default function RoleSelect({value, selected, disabled, onChange, title, subTitle}: {title: string, subTitle: string, value: UserRole, selected: boolean, disabled: boolean, onChange: (id: "role" | "resume", value: UserRole | string) => void,}) {
  const onSelect = useCallback(() => {
    if (disabled) {
      return;
    }
onChange("role", value);

  }, [onChange, disabled, value])
  return (
   <div onClick={onSelect} className={`w-[90%] mt-2 md:w-[15vw] border-[1px] ${disabled ? "border-neutral-300 opacity-70" : "border-neutral-500 opacity-100"} ${selected ? "border-white" : "border-neutral-300"} hover:opacity-70 transition-all duration-200 ease-in-out p-4 rounded-md cursor-pointer`}>
    <Heading center title={title} subtitle={subTitle} />
   </div>
  )
}
