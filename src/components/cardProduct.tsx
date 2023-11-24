import { Flame } from 'lucide-react'
import Image from 'next/image'
import { getProducsInRealTime } from '../storage/productStorage'
import QuickviewProduct from './quickviewProduct'

// const products = [
//   {
//     id: 1,
//     name: 'Earthen Bottle',
//     href: '#',
//     price: '48',
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
//     imageAlt:
//       'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
//   },
//   {
//     id: 2,
//     name: 'Nomad Tumbler',
//     href: '#',
//     price: '35',
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
//     imageAlt:
//       'Olive drab green insulated bottle with flared screw lid and flat top.',
//   },
//   {
//     id: 3,
//     name: 'Focus Paper Refill',
//     href: '#',
//     price: '89',
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
//     imageAlt:
//       'Person using a pen to cross a task off a productivity paper card.',
//   },
//   {
//     id: 4,
//     name: 'Machined Mechanical Pencil',
//     href: '#',
//     price: '35',
//     imageSrc:
//       'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//     imageAlt:
//       'Hand holding black machined steel mechanical pencil with brass tip and top.',
//   },
//   // More products...
// ]

export default async function CardProduct() {
  const products = await getProducsInRealTime()

  return (
    <div className='mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
      <div className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
        {products.map((product) => (
          <a
            key={product.id}
            href={`/product/${product.id}`}
            className='scale-95 ease-linear duration-150 group hover:scale-100 hover:shadow-md hover:bg-pear-50 p-4 rounded-md'
          >
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
              <Image
                src={product.photoURL}
                alt={product.name}
                width={300}
                height={300}
                className='object-cover object-center group-hover:opacity-100'
              />

              <div className='w-8 h-8 m-1 items-center justify-center rounded-md absolute'>
                <Flame
                  color='#FF4646'
                  className='bg-grey-900/60 backdrop-blur-xl p-2 rounded-md'
                  size={48}
                />
              </div>
            </div>
            <h3 className='mt-4 text-sm text-slate-900 font-lato'>
              {product.name}
            </h3>
            <p className='mt-1 text-lg font-medium text-pear-900'>
              R$ {product.price}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
