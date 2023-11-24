import { ReactNode } from 'react'

import Header from '@components/header'
import { AuthProvider } from '@src/contexts/useUser'
import { CartProvider } from '@src/contexts/cartContext'
import SlideOverCart from '@src/components/slideOverCart'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <div className='w-full flex justify-center items-center'>
          <Header />
          <SlideOverCart />
          <div className='max-w-xl mt-32 self-center lg:max-w-7xl flex items-center justify-center'>
            {children}
          </div>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
