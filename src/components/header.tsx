'use client'

import { Fragment, useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'

import { Dropdown } from 'flowbite-react'
import { Search, ShoppingCart, User, UserCog } from 'lucide-react'

import { useUser } from '@src/contexts/useUser'
import { useCart } from '@src/contexts/cartContext'
import { getStoredUser } from '@src/storage/userStorage'
import { UserDTO } from '@src/dto/UserDTO'
import { useRouter } from 'next/navigation'

export default function Example() {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  const { signOut } = useUser()
  const { openCart } = useCart()
  const router = useRouter()

  async function handleSignOut() {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  async function getUser() {
    try {
      const user = await getStoredUser()
      if (user) setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <nav className='z-50 fixed top-3 left-10 right-10 rounded-lg bg-pear-400/60 backdrop-blur-lg p-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <h1 className='text-2xl font-bold'>FashionTrends</h1>
          </Link>

          <section className='hidden md:flex gap-4'>
            <div className='max-x-md mx-auto relative'>
              <input
                type='text'
                className='w-full px-4 py-2 bg-pear-50 border-2 border-pear-100 rounded-md focus:outline-none focus:border-pear-500 focus:ring-pear-500 ease-in-out transition duration-300'
                placeholder='Pesquisar...'
              />

              <Search className='text-pear-400 font-bold absolute top-1/2 right-4 transform -translate-y-1/2' />
            </div>
            <div className='flex items-center space-x-4'>
              {user.admin && (
                <Link href='/admin'>
                  <UserCog className='text-pear-800 font-bold' />
                </Link>
              )}
              <button onClick={openCart}>
                <ShoppingCart className='text-pear-800 font-bold' />
              </button>
            </div>
          </section>

          <div className='flex space-x-4'>
            <Dropdown
              className='bg-pear-200 border-pear-400 rounded-xl self-end'
              label='Sigin'
              renderTrigger={() => (
                <section className='flex flex-row space-x-2'>
                  {user.email ? (
                    <div className='flex flex-col items-end'>
                      <p className='text-peaer-500'>Olá,</p>
                      <p className='text-peaer-600 text-xl font-bold'>
                        {user?.name}!
                      </p>
                    </div>
                  ) : (
                    <div className='flex items-center space-x-4'>
                      <div className='flex flex-col items-end'>
                        <p className='text-peaer-500 text-md'>Bem-vindo :)</p>
                        <p className='text-peaer-600 text-lg font-bold'>
                          Entre ou cadastre-se
                        </p>
                      </div>
                      <User size={32} />
                    </div>
                  )}

                  {user.email && (
                    <Image
                      src={user?.photoURL as string}
                      width={225}
                      height={225}
                      alt='Profile Image'
                      className='rounded-full bg-pear-400 w-12 h-12 border-2 border-peaer-300'
                    />
                  )}
                </section>
              )}
            >
              <Dropdown.Header>
                <span className='block text-sm text-pear-400 font-bold'>
                  {user?.name}
                </span>
                <span className='block truncate text-sm font-medium text-peaer-500'>
                  {user?.email}
                </span>
              </Dropdown.Header>
              {!user.email && (
                // <Link href={'/signIn'}>
                <Dropdown.Item
                  href='/signIn'
                  className='text-pear-950 font-lato text-md'
                >
                  Entrar na conta
                </Dropdown.Item>
                // </Link>
              )}
              {user.email && (
                <Dropdown.Item
                  onClick={handleSignOut}
                  className='text-pear-950 font-lato text-md'
                >
                  Sair da conta
                </Dropdown.Item>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  )
}
