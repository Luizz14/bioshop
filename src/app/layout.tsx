import type { Metadata } from 'next'
import { Inter, Lato, Frank_Ruhl_Libre } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@src/contexts/useUser'

const inter = Inter({ subsets: ['latin'] })
const lato = Lato({ subsets: ['latin'], weight: '400' })
const frank = Frank_Ruhl_Libre({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FashionTrends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={`${inter.className} ${lato.className} ${frank.className}`}
      lang='pt'
    >
      <body className='antialiased text-pear-950 bg-pear-50'>{children}</body>
    </html>
  )
}
