'use client'

import { Carousel } from 'flowbite-react'

export function CarouselProducts() {
  return (
    <div className='grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96'>
      <Carousel>
        <div>
          <span className='bg-white'>OLA</span>
          <span className='bg-white'>OLA 2</span>
        </div>
      </Carousel>
      <Carousel indicators={false}>
        <img
          src='https://flowbite.com/docs/images/carousel/carousel-1.svg'
          alt='...'
        />
        <img
          src='https://flowbite.com/docs/images/carousel/carousel-2.svg'
          alt='...'
        />
        <img
          src='https://flowbite.com/docs/images/carousel/carousel-3.svg'
          alt='...'
        />
        <img
          src='https://flowbite.com/docs/images/carousel/carousel-4.svg'
          alt='...'
        />
        <img
          src='https://flowbite.com/docs/images/carousel/carousel-5.svg'
          alt='...'
        />
      </Carousel>
    </div>
  )
}
