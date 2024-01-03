"use client"

import { useEffect, useState } from "react";
import LoginModels from "../models/LoginModels";
import AddJob from "../models/AddJob";
import JobDetailsModel from "../models/jobDetailsModel";
import UpdateProfile from "../models/UpdateProfile";

export const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <>
        <LoginModels />
        <JobDetailsModel />
        <AddJob />
        <UpdateProfile />
        </>
    )
}