'use client'

import { Carousel } from 'flowbite-react'
import { Avatar } from 'flowbite-react'
import Image from 'next/image'

export function Banner() {
  return (
    <div className='h-56 sm:h-64 xl:h-80 2xl:h-96'>
      <Carousel>
        <Image
          width={587}
          height={256}
          src='https://images.pexels.com/photos/6634678/pexels-photo-6634678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='...'
          className='h-56 sm:h-64 xl:h-80 2xl:h-96 object-cover'
        />
        <Image
          width={587}
          height={256}
          src='https://images.pexels.com/photos/6621364/pexels-photo-6621364.jpeg'
          alt='...'
          className='h-56 sm:h-64 xl:h-80 2xl:h-96 object-cover'
        />
        <Image
          width={587}
          height={256}
          src='https://images.pexels.com/photos/6634652/pexels-photo-6634652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='...'
          className='h-56 sm:h-64 xl:h-80 2xl:h-96 object-cover'
        />
        <Image
          width={587}
          height={256}
          src='https://images.pexels.com/photos/4406801/pexels-photo-4406801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='...'
          className='h-56 sm:h-64 xl:h-80 2xl:h-96 object-cover'
        />
        <Image
          width={587}
          height={256}
          src='https://images.pexels.com/photos/5237850/pexels-photo-5237850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='...'
          className='h-56 sm:h-64 xl:h-80 2xl:h-96 object-cover'
        />
      </Carousel>
    </div>
  )
}
