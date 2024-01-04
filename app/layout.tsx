import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/ThemeProviders'
import { ModelProvider } from '@/components/providers/ModelProvider'
import ClientOnly from '@/components/ClientOnly'
import Navbar from '@/components/Navbar'
import { User } from '@prisma/client'
import getCurrentUser from '@/actions/getCurrentUser'
import ToasterProvider from '@/components/providers/ToasterPrivder'
import { UserWithNotApp } from '@/types'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Board App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser: UserWithNotApp | null = await getCurrentUser();
  return (
    <html lang="en">
    <body className={inter.className}>
      <Analytics />
    <ClientOnly>
      <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
      >
        <ModelProvider />
        <ToasterProvider />
        <Toaster />
        <Navbar currentUser={currentUser} />
       </ThemeProvider>
      </ClientOnly>
          {children}
          </body>
    </html>
  )
}
