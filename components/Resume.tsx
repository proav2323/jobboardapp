"use client"

import { UserRole } from '@prisma/client'
import React, { useRef, useState } from 'react'
import Heading from './Heading'
import { Cross, UploadCloud } from 'lucide-react'
import { BarLoader } from 'react-spinners'
import { storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import  Toast  from 'react-hot-toast'

export const uploadResume = (fileRef: React.RefObject<HTMLInputElement>, onChange: any, setIsLoading?: any,) => {

  if (!fileRef) {
     return;
  }

  if (!fileRef.current?.files) {
     return;
  }
  const file = fileRef.current?.files[0];
  console.log(file)

  if (file.type !== "application/pdf") {
    return Toast.error("Please select a PDF file");
  }
  setIsLoading(true);
  const storageRef = ref(storage, `images/${file.name}`);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    Toast.error(error.message);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       onChange("resume", downloadURL);
       setIsLoading(false);
    }); 
  }
);

}

export default function Resume({resume, onChange, disabled}: {resume?: string, onChange: ((id: "role" | "resume" |"companyId", value: UserRole | string) => void) |((id: "resume", value: UserRole | string) => void), disabled: boolean}) {
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onUpload = () => {
    if (disabled || isLoading) {
      return;
    }
      console.log(isLoading)
    uploadResume(fileRef, onChange ,setIsLoading);
  }
  return (
    <div className='flex flex-col justify-center items-center w-full p-2'>
      {resume !== "" && resume !== undefined && resume !== null ? (
        <div className='flex bg-neutral-600 p-4 rounded-md cursor-pointer'>
          <a href={resume} target="_blank" rel="noreferrer">Your View Resume</a>
          <Cross className='mx-2' onClick={() => onChange("resume", "")} />
        </div>
      ) : (
         <div className='flex flex-col items-center w-full gap-4'>
          <input type='file' ref={fileRef} hidden disabled={disabled || isLoading} onChange={onUpload} />
          <Heading title='Upload Your Resume' />
          <div onClick={() => fileRef.current?.click()} className={`w-[90%] ${disabled ? "border-neutral-800": "border-white"} ${isLoading ? "border-neutral-800": "border-white"} border-[1px]  mx cursor-pointer border-dashed hover:opacity-80 transition mx-auto h-[15vw] flex flex-col justify-center items-center`}>
            <UploadCloud size={35} />
            <span className='font-light text-neutral-400'>Resume should be In Pdf file</span>
            {isLoading && (
              <div className='flex justify-center items-center w-full'>
                <BarLoader />
              </div>
            )}
          </div>
         </div>
      )}
    </div>
  )
}
