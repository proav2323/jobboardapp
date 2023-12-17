"use client"

import { useEffect, useState } from "react";
import LoginModels from "../models/loginModels";

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
        </>
    )
}