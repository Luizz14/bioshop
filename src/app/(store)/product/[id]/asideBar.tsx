// import { MapPinLine } from '@phosphor-icons/react'
import Button from '@components/button'
import { addToCart } from '@src/storage/productStorage'
import Link from 'next/link'
import BtnAddCart from './btn-add-cart'

interface AsideBarProps {
  price: number
  productId: string
}

export function AsideBar({ price, productId }: AsideBarProps) {
  return (
    <aside className='w-full h-auto p-4 rounded-lg lg:max-w-xs shadow-xl bg-white-200 border-2 border-pear-700'>
      <h1 className='text-xl text-pear-400'>Valor</h1>
      <h2 className='text-4xl text-pear-900 font-bold'>R$ {price}</h2>
      <p className='text-gray-950'>
        Entrega <span className='text-pear-400 font-bold'>grátis</span>
      </p>

      <p className='text-sm text-gray-800'>Se pedir dentro de 23 hrs 49 mins</p>

      <div className='my-4'>
        <p>Enviar para</p>
        <div className='flex flex-row items-center space-x-2'>
          {/* <MapPinLine size={25} color='#55B234' weight='bold' /> */}
          <section className='flex flex-col'>
            <span className='text-pear-600 text-sm  font-bold'>
              Rua pipipipopopo, 34
            </span>

            <span className='text-pear-600 text-sm'>49095-100</span>
          </section>
        </div>
      </div>

      <section className='flex flex-row space-x-2 my-4 items-center'>
        <p>Quantidade:</p>
        <select
          name='amount'
          id='amountQuantity'
          className='border-2 border-pear-300 rounded-lg bg-transparent p-1 active:border-pear-900'
        >
          <option value='1'>1</option>
          <option value='1'>2</option>
          <option value='1'>3</option>
          <option value='1'>4</option>
          <option value='1'>5</option>
          <option value='1'>6</option>
          <option value='1'>7</option>
          <option value='1'>8</option>
        </select>
      </section>

      <div className='space-y-4 mt-4'>
        <BtnAddCart productId={productId} />
        <Button title='Adicionar ao carrinho' buttonType='clean' />

        {/* <button className='bg-pear-400 rounded-lg py-3 w-full font-bold text-xl text-pear-950'>
          Comprar agora!
        </button> */}
        {/* <button className='border-2 border-pear-400 rounded-lg py-3 w-full font-bold text-xl text-pear-500'>
          <Link href='/cart'>Adicionar ao carrinho</Link>
        </button> */}
      </div>
    </aside>
  )
}
