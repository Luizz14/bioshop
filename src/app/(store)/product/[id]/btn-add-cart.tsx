'use client'

import Button from '@src/components/button'
import { addToCart } from '@src/storage/productStorage'

export default function BtnAddCart({ productId }: { productId: string }) {
  async function handleAddToCart() {
    console.log(productId)
    await addToCart(productId, 1)
  }

  return (
    <form action={handleAddToCart}>
      <Button type='submit' title='Comprar agora!' />
    </form>
  )
}
