'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

import { HiMail } from 'react-icons/hi'

import LogoImage from '@src/assets/logoFashionTrends.svg'
import WomanImage from '@src/assets/WomanImage.svg'
import GoogleImage from '@src/assets/GoogleVector.svg'

import { auth } from '@src/services/firebase.config'
import { useState } from 'react'
import Input from '@src/components/input'
import { Label, TextInput } from 'flowbite-react'
import Button from '@src/components/button'

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [step, setStep] = useState(1)

  const router = useRouter()

  const db = getFirestore()

  function saveOnCache(key: string, email: string): void {
    const objetoSerializado = JSON.stringify(email)
    localStorage.setItem(key, objetoSerializado)
  }

  async function handleSignInAdmin() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user

        saveOnCache('email', email)
        router.push('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  async function handleSignInWithGoogle() {
    try {
      const google = new GoogleAuthProvider()

      await signInWithPopup(auth, google).then(async ({ user }) => {
        const docRef = doc(db, 'users', user.email as string)

        const userDoc = await getDoc(docRef)

        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', user.email as string), {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            admin: false,
          })
        }
        saveOnCache('email', user.email as string)
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex w-full'>
      <Image
        src={WomanImage}
        width={500}
        height={450}
        alt=''
        className='left-0 top-0 w-full -ml-44 h-screen'
      />

      <main className='w-full h-screen mt-32 items-center justify-start flex flex-col space-y-4'>
        <Image src={LogoImage} alt='' className='w-44' />
        <h1 className='text-6xl font-bold'>Seja bem-vindo</h1>

        <span className='w-3/12 h-1 bg-pear-50/60 rounded-xl' />

        {step === 1 ? (
          <>
            <button
              onClick={handleSignInWithGoogle}
              className='flex gap-4 bg-pear-950 text-pear-50 px-12 py-3 rounded-md text-xl font-lato'
            >
              <Image src={GoogleImage} alt='' />
              Entrar com google
            </button>
            <p className='font-lato text-sm'>
              Ou entrar como{' '}
              <span
                className='text-pear-700 font-bold hover:cursor-pointer'
                onClick={() => setStep(2)}
              >
                administrador
              </span>
            </p>
          </>
        ) : (
          <>
            <div className='max-x-lg flex flex-col space-y-4'>
              <input
                type='email'
                className='max-w-lg px-4 py-2 bg-pear-50 border-2 border-pear-100 rounded-md focus:outline-none focus:border-pear-500 focus:ring-pear-500 ease-in-out transition duration-300'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                className='max-w-lg px-4 py-2 bg-pear-50 border-2 border-pear-100 rounded-md focus:outline-none focus:border-pear-500 focus:ring-pear-500 ease-in-out transition duration-300'
                placeholder='Senha'
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className='flex flex-col space-y-2 items-center'>
                <Button title='Entrar como admin' onClick={handleSignInAdmin} />
                <p className='font-lato text-sm'>
                  Ou entrar como{' '}
                  <span
                    className='text-pear-700 font-bold hover:cursor-pointer'
                    onClick={() => setStep(1)}
                  >
                    usuário{' '}
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
