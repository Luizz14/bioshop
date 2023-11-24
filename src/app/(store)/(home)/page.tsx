import { Banner } from '@components/banner'
import CardProduct from '@components/cardProduct'

import { app, auth, firebaseConfig } from '@services/firebase.config'

import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore'

import ElementSvg from '@src/assets/Element.svg'
import BlurElementSvg from '@src/assets/BlurElement.svg'

import Image from 'next/image'
import { addProduct } from '@src/storage/productStorage'
import { ProductDTO } from '@src/dto/ProductDTO'
import Footer from '@src/components/footer'
import SlideOverCart from '@src/components/slideOverCart'
import NewProducts from './newProducts'
import { getAuth } from 'firebase/auth'

export default async function Home() {
  const logedUser = await getAuth(app)
  const db = getFirestore()
  // async function addProducts() {
  //   products.forEach(async (item) => {
  //     await addProduct(item)
  //     console.log('adicionando')
  //   })
  // }
  const q = query(collection(db, 'Products'))

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const products: ProductDTO[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductDTO[]
    unsubscribe()
    return products
  })

  return (
    <div className='space-y-4 self-center'>
      <Banner />

      <NewProducts />
      <h1>{logedUser.currentUser?.email}</h1>

      <section className='items-center justify-center flex flex-col space-y-4 p-4 rounded-md bg-pear-200'>
        <h1 className='text-4xl font-bold text-pear-800'>Categorias</h1>
        <p className='text-md text-pear-950 font-lato'>
          Descubra estilo e tendências em nossas categorias sofisticadas.
        </p>

        <div className='flex space-x-4 z-20'>
          <div className='flex flex-col'>
            <Image
              src={
                'https://images.pexels.com/photos/16390585/pexels-photo-16390585/free-photo-of-roupas-trajes-moda-tendencia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              }
              alt=''
              width={326}
              height={326}
              className='w-[350px] h-[350px] rounded-sm shadow-sm bg-pear-50'
            />
            <button className='-mt-7 flex self-center hover:-mt-9 ease-in duration-150 bg-pear-900/80 backdrop-blur-xl py-2 w-9/12 rounded-md text-pear-100 text-xl font-lato items-center justify-center'>
              Camisetas
            </button>
          </div>

          <div className='flex flex-col'>
            <Image
              src={
                'https://images.pexels.com/photos/17033702/pexels-photo-17033702/free-photo-of-classico-elegante-tradicional-sofisticado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              }
              alt=''
              width={326}
              height={326}
              className='w-[350px] h-[350px] rounded-sm shadow-sm bg-pear-50'
            />
            <button className='-mt-7 flex self-center hover:-mt-9 ease-in duration-150 bg-pear-900/80 backdrop-blur-xl py-2 w-9/12 rounded-md text-pear-100 text-xl font-lato items-center justify-center'>
              Sapatos
            </button>
          </div>

          <div className='flex flex-col'>
            <Image
              src={
                'https://images.pexels.com/photos/1358840/pexels-photo-1358840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              }
              alt=''
              width={326}
              height={326}
              className='w-[350px] h-[350px] rounded-sm shadow-sm bg-pear-50'
            />
            <button className='-mt-7 flex self-center hover:-mt-9 ease-in duration-150 bg-pear-900/80 backdrop-blur-xl py-2 w-9/12 rounded-md text-pear-100 text-xl font-lato items-center justify-center'>
              Bolsas
            </button>
          </div>
        </div>

        <Image
          src={BlurElementSvg}
          alt=''
          width={568}
          height={568}
          className='absolute right-36 -bottom-20 z-0'
        />
        <Image
          src={ElementSvg}
          alt=''
          width={155}
          height={155}
          className='absolute right-36 -bottom-20 z-10'
        />

        <span className='w-8/12 h-1 rounded-lg bg-pear-300' />

        <h1 className='text-4xl font-bold text-pear-800'>Roupas</h1>

        <CardProduct />
      </section>
      <Footer />
    </div>
  )
}
