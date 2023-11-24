import { addToCart, getProductById } from '@storage/productStorage'
import Image from 'next/image'
import { AsideBar } from './asideBar'
import { Comments } from './comments'

interface ProductProps {
  params: {
    id: string
  }
}

export default async function Product({ params }: ProductProps) {
  const product = await getProductById(params.id)

  return (
    <div className='w-full max-w-7xl m-auto p-6'>
      <main className='lg:flex lg:flex-row items-start lg:space-x-6 space-y-4'>
        <div className='flex flex-row space-x-6'>
          <Image
            src={product?.photoURL as string}
            width={400}
            height={400}
            alt='Product Image'
            className='max-lg:w-72 max-w-lg rounded-2xl'
          />

          <div className='flex flex-col space-y-4'>
            <h1 className='text-2xl text-pear-950 font-bold'>
              {product?.name}
            </h1>
            <section className='flex flex-row space-x-4 items-center'>
              <div className='flex direction-row items-center'>
                {/* <Star
                    size={18}
                    color='#1A652F'
                    fill='#1A652F'
                    weight='fill'
                  />
                  <Star size={18} color='#1A652F' weight='fill' />
                  <Star size={18} color='#1A652F' weight='fill' />
                  <Star size={18} color='#1A652F' weight='fill' />
                  <Star size={18} color='#1A652F' /> */}
              </div>

              <p className=''>{product?.stock} em estoque</p>
              <span className='w-1 h-6 bg-pear-400 rounded-lg' />
              <p className=''>{product?.sold} avaliações</p>
              <span className='w-1 h-6 bg-pear-400 rounded-lg' />
              <p>{product?.sold} vendidos</p>
            </section>

            <section className='text-pear-950'>{product?.description}</section>
          </div>
        </div>
        <AsideBar price={product?.price as number} productId={params.id} />
      </main>

      <Comments rating={product?.rating} sold={product?.sold} />
    </div>
  )
}
