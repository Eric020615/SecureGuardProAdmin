import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@lib/utils'
import LayoutWrapper from '@screen/layoutWrapper'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'Secure Guard Pro',
    description: 'Admin Portal',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={cn('font-inter antialiased', inter.variable)}>
                <NextTopLoader />
                <div className="w-full">
                    <LayoutWrapper>{children}</LayoutWrapper>
                </div>
            </body>
        </html>
    )
}
