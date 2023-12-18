"use client"
import {PacmanLoader} from "react-spinners"

import React from 'react'

export default function Loader() {
  return (
        <div
    className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
    <PacmanLoader color="#36d7b7" />
    </div>
  )
}
