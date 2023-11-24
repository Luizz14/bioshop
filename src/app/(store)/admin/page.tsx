import { useForm, Controller } from 'react-hook-form'

import Input from '@components/input'
import Button from '@components/button'

import yup from 'yup'

import { ProductDTO } from '@dto/ProductDTO'
import { addProduct, getProducsInRealTime } from '@storage/productStorage'
import FormNewProduct from './formNewProduct'
import NewForm from './new-form'
import Image from 'next/image'
import { DropDown } from './dropDown'
import EditButton from './editButton'
import FormEditProduct from './formEditProduct'
import DeleteButton from './deleteButton'

export default async function Managment() {
  const products = await getProducsInRealTime()

  return (
    <div className='space-y-6 p-6'>
      <FormNewProduct />

      {/* <NewForm /> */}

      <ul role='list' className='divide-y divide-pear-100'>
        {products.map((product) => {
          const newDescription = product.description.substring(0, 50) + '...'

          return (
            <li key={product.id} className='flex justify-between gap-x-6 py-5'>
              <div className='flex min-w-0 gap-x-4'>
                <Image
                  width={125}
                  height={125}
                  className='h-12 w-12 flex-none rounded-full bg-gray-50'
                  src={product.photoURL}
                  alt=''
                />
                <div className='min-w-0 flex-auto'>
                  <p className='text-sm font-semibold leading-6 text-pear-900'>
                    {product.name}
                  </p>
                  <p className='mt-1 truncate text-xs leading-5 text-pear-800'>
                    {/* {product.description} */}
                    {newDescription}
                  </p>
                  <p className='mt-1 truncate text-sm leading-5 text-pear-800'>
                    R$ {product.price}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                  <p className='text-sm leading-6 text-gray-900'>
                    <span className='font-bold text-pear-700'>
                      {product.stock}{' '}
                    </span>
                    peças em estoque
                  </p>
                  <p className='mt-1 text-xs leading-5 text-gray-500'>
                    {product.sold} vendidos
                  </p>
                </div>
                <EditButton productId={product.id as string}>
                  <FormEditProduct id={product.id as string} />
                </EditButton>
                <DeleteButton
                  productId={product.id as string}
                  name={product.name}
                />
                {/* <DropDown productId={product.id} productName={product.name} /> */}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
