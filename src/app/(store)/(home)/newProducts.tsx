import { ProductDTO } from '@src/dto/ProductDTO'
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore'
import Image from 'next/image'
import { useState } from 'react'

import ElementSvg from '@src/assets/Element.svg'
import BlurElementSvg from '@src/assets/BlurElement.svg'
import { getNewProducts } from '@src/storage/productStorage'

export default async function NewProducts() {
  //   const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[])

  //   const db = getFirestore()

  //   const q = query(collection(db, 'Products'))

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const products: ProductDTO[] = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     })) as ProductDTO[]
  //     unsubscribe()
  //     return products
  //   })

  const products = await getNewProducts()

  return (
    <section className='items-center justify-center flex flex-col space-y-4 p-4 bg-pear-50 border-t-2 border-l-2 border-t-pear-950 border-l-pear-950'>
      <h1 className='text-4xl font-bold text-pear-950'>
        Nossos <span className='font-black text-pear-600'>novos</span> produtos
      </h1>

      {/* <h2 className='text-4xl font-bold text-pear-950'>com um descontão</h2> */}

      <Image
        src={ElementSvg}
        alt=''
        width={155}
        height={155}
        className=' absolute left-36'
      />

      <Image
        src={BlurElementSvg}
        alt=''
        width={568}
        height={568}
        className='absolute -left-24 z-0'
      />

      <div className='w-full mx-auto max-w-xl px-4 sm:px-4 lg:max-w-5xl lg:px-8'>
        <div className='items-center justify-center w-full grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((item) => {
            return (
              <a
                key={item.id}
                href={`/product/${item.id}`}
                className='scale-95 ease-linear duration-150 group hover:scale-100 hover:shadow-md hover:bg-pear-50 p-4 rounded-md z-40'
              >
                <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                  <Image
                    src={item.photoURL}
                    alt={''}
                    width={300}
                    height={300}
                    className=' object-cover object-center group-hover:opacity-100 h-24'
                  />
                </div>
                <h3 className='mt-4 text-sm text-slate-900 font-lato'>
                  {item.name}
                </h3>

                <div className='flex space-x-2 items-end'>
                  <p className='mt-1 text-md font-medium text-pear-900/30 line-through'>
                    R$ {Math.round(item.price * 1.5)}
                  </p>
                  <p className='mt-1 text-2xl font-medium text-pear-900'>
                    R$ {item.price}
                  </p>
                </div>
              </a>
              //   <a
              //     key={item.id}
              //     href={`/product/${item.id}`}
              //     className='scale-95 ease-linear duration-150 group hover:scale-100 hover:shadow-md hover:bg-pear-50 p-4 rounded-md'
              //   >
              //     <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
              //       <Image
              //         src={item.photoURL}
              //         alt={item.name}
              //         width={300}
              //         height={300}
              //         className='object-cover object-center group-hover:opacity-100'
              //       />
              //     </div>
              //     <h3 className='mt-4 text-sm text-slate-900 font-lato'>
              //       {item.name}
              //     </h3>
              //     <p className='mt-1 text-lg font-medium text-pear-900'>
              //       R$ {item.price}
              //     </p>
              //   </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
