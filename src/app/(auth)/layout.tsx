import { ReactNode } from 'react'

export default function SignInLayout({ children }: { children: ReactNode }) {
  return <div className='bg-pear-200 w-full min-h-screen flex'>{children}</div>
}
