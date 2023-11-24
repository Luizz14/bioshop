'use client'
// Importar os módulos necessários
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'

// Definir o esquema de validação do Yup
const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  photoUrl: yup
    .string()
    .url('A URL da foto deve ser válida')
    .required('A URL da foto é obrigatória'),
  price: yup
    .number()
    .min(0, 'O preço deve ser maior ou igual a zero')
    .required('O preço é obrigatório'),
  stock: yup
    .number()
    .integer('O estoque deve ser um número inteiro')
    .min(0, 'O estoque deve ser maior ou igual a zero')
    .required('O estoque é obrigatório'),
})

interface ProductFormValues {
  name: string
  description: string
  photoUrl: string
  price: number
  stock: number
}

// Definir o componente do formulário
export default function NewForm() {
  // Usar o React Hook Form com o Yup como resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Definir a função que será chamada ao enviar o formulário
  const onSubmit = (data: ProductFormValues) => {
    // Mostrar os dados do formulário no console
    console.log(data)
  }

  // Retornar o JSX do formulário
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center p-4 space-y-4 bg-gray-100'
    >
      <h1 className='text-2xl font-bold'>Adicionar Produto</h1>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='name' className='text-sm font-medium'>
          Nome
        </label>
        <input
          id='name'
          type='text'
          {...register('name')}
          className='w-64 px-2 py-1 border border-gray-300 rounded'
        />
        {errors.name && (
          <p className='text-xs text-red-500'>{errors.name.message}</p>
        )}
      </div>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='description' className='text-sm font-medium'>
          Descrição
        </label>
        <textarea
          id='description'
          {...register('description')}
          className='w-64 h-32 px-2 py-1 border border-gray-300 rounded'
        />
        {errors.description && (
          <p className='text-xs text-red-500'>{errors.description.message}</p>
        )}
      </div>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='photoUrl' className='text-sm font-medium'>
          URL da foto
        </label>
        <input
          id='photoUrl'
          type='text'
          {...register('photoUrl')}
          className='w-64 px-2 py-1 border border-gray-300 rounded'
        />
        {errors.photoUrl && (
          <p className='text-xs text-red-500'>{errors.photoUrl.message}</p>
        )}
      </div>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='price' className='text-sm font-medium'>
          Preço
        </label>
        <input
          id='price'
          type='number'
          {...register('price')}
          className='w-64 px-2 py-1 border border-gray-300 rounded'
        />
        {errors.price && (
          <p className='text-xs text-red-500'>{errors.price.message}</p>
        )}
      </div>
      <div className='flex flex-col space-y-2'>
        <label htmlFor='stock' className='text-sm font-medium'>
          Estoque
        </label>
        <input
          id='stock'
          type='number'
          {...register('stock')}
          className='w-64 px-2 py-1 border border-gray-300 rounded'
        />
        {errors.stock && (
          <p className='text-xs text-red-500'>{errors.stock.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
      >
        Enviar
      </button>
    </form>
  )
}
