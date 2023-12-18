"use client"

import { UserRole } from '@prisma/client'
import React from 'react'
import RoleSelect from './RoleSelect'

export default function Role({onChange, disabled, role}: {onChange: (id: "role" | "resume" | "companyId", value: UserRole | string) => void, disabled: boolean, role: UserRole}) {
  return (
    <div className='flex md:flex-row flex-col justify-between items-center w-full'>
      <RoleSelect title="Job Seeker" subTitle='Looking For a Job?' value={UserRole.JOB_SEEKER} onChange={onChange} disabled={disabled} selected={role === UserRole.JOB_SEEKER} />
      <RoleSelect title="Employer" subTitle='is Your company hiring?' value={UserRole.EMPLOYER} onChange={onChange} disabled={disabled} selected={role === UserRole.EMPLOYER} />
    </div>
  )
}
