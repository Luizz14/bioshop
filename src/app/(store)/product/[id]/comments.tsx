'use client'

import { Rating } from 'flowbite-react'

import { Config } from 'tailwindcss'
import { Comment } from './comment'

interface CommentsProps {
  sold: number | undefined
  rating: number | undefined
}

export function Comments({ sold, rating }: CommentsProps) {
  return (
    <section className='my-4 space-y-2 w-full shadow-lg rounded-xl p-4 bg-pear-100'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-xl text-pear-950 font-bold'>Avaliações {sold}</h1>

        {/* <div className='flex flex-col items-end'>
          <div className='flex direction-row items-center'>
            <Star size={25} color='#1A652F' fill='#1A652F' weight='fill' />
            <Star size={25} color='#1A652F' weight='fill' />
            <Star size={25} color='#1A652F' weight='fill' />
            <Star size={25} color='#1A652F' weight='fill' />
            <Star size={25} color='#1A652F' />
          </div>
          <h2 className='text-xl text-pear-500 font-bold'>4.1</h2>
        </div> */}
      </div>

      <section className='my-2'>
        <Rating className='my-2'>
          <Rating.Star color='#f06b37' />
          <Rating.Star color='#f06b37' />
          <Rating.Star color='#f06b37' />
          <Rating.Star color='#f06b37' />
          <Rating.Star filled={false} />
          <p className='ml-2 text-sm font-medium text-pear-900 dark:text-gray-400'>
            {rating} out of 5
          </p>
        </Rating>
        <p className='mb-4 text-sm font-medium text-gray-500 dark:text-gray-400'>
          1,745 global ratings
        </p>
        {/* <Rating.Advanced percentFilled={70} className='mb-2'>
          <p className='text-pear-500'>5 star</p>
        </Rating.Advanced>
        <Rating.Advanced percentFilled={17} className='mb-2'>
          <p className='text-pear-500'>4 star</p>
        </Rating.Advanced>
        <Rating.Advanced percentFilled={8} className='mb-2'>
          <p className='text-pear-500'>3 star</p>
        </Rating.Advanced>
        <Rating.Advanced percentFilled={4} className='mb-2'>
          <p className='text-pear-500'>2 star</p>
        </Rating.Advanced>
        <Rating.Advanced percentFilled={1}>
          <p className='text-pear-500'>1 star</p>
        </Rating.Advanced> */}
      </section>

      <section className='gap-4 flex flex-row'>
        <Comment />
      </section>
    </section>
  )
}
