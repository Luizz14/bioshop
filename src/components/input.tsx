import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  valid?: boolean
}

export default function Input({ errorMessage, valid, ...rest }: InputProps) {
  const variants = {
    error: 'border-red-500',
    valid: 'border-green-400',
  }

  const inputStyles = errorMessage && variants.error
  const inputStylesValid = valid ? 'border-green-400' : ''

  return (
    <div className='flex flex-col'>
      <input
        className={`placeholder:font-normal rounded-md ring-transparent border-2 border-transparent text-pear-950 font-semibold focus:border-pear-500 focus:ring-pear-500 ${inputStyles} ${inputStylesValid}`}
        type='text'
        {...rest}
      />
      {errorMessage && (
        <span className='text-red-700 font-bold text-sm'>{errorMessage}</span>
      )}
    </div>
  )
}
