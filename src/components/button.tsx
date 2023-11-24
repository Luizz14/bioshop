import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  buttonType?: 'default' | 'outline' | 'clean'
}

export default function Button({
  title,
  buttonType = 'default',
  ...rest
}: ButtonProps) {
  const variants = {
    default: 'bg-pear-500 text-white',
    outline: 'border border-pear-500 text-pear-900',
    clean: 'text-pear-900 focus:bg-pear-500/30',
  }

  const buttonStyles = variants[buttonType] || variants['default']

  return (
    <button
      className={`font-semibold text-xl w-full py-2 px-4 rounded-md ease-in-out duration-300 ${buttonStyles}`}
      {...rest}
    >
      <span className='font-lato'>{title}</span>
    </button>
  )
}
