"use client"
import React, { useEffect, useState } from 'react'

export default function ClientOnly({children}: {children: React.ReactNode}) {

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) {
        return null;
    }

  return (
    <div className='w-full'>
    {children}
    </div>
  )
}