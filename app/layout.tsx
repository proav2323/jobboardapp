import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/ThemeProviders'
import { ModelProvider } from '@/components/providers/ModelProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
      >
        <ModelProvider />
        <body className={inter.className}>{children}</body>
        <Toaster />
      </ThemeProvider>
    </html>
  )
}
