'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface cartItem {
  productId: string
  quantity: number
}

interface CartContextType {
  //   items: cartItem[]
  //   addToCart: (productId: string) => void
  open: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  function openCart() {
    setOpen(true)
  }

  function closeCart() {
    setOpen(false)
  }

  return (
    <CartContext.Provider value={{ open, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
