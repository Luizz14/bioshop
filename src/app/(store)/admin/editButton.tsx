'use client'

import { Modal } from 'flowbite-react'
import { ReactNode, useEffect, useState } from 'react'

import { FileSignature } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { ProductDTO } from '@src/dto/ProductDTO'
import { getProductById } from '@src/storage/productStorage'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '@src/components/input'
import Button from '@src/components/button'
import FormEditProduct from './formEditProduct'

interface EditButtonType {
  productId: string
  children: ReactNode
}

interface ProductFormValues {
  name: string
  description: string
  photoUrl: string
  price: number
  stock: number
}

const newProductSchema = yup.object({
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

export default function EditButton({ productId, children }: EditButtonType) {
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)
  const [openModal, setOpenModal] = useState(false)

  async function handleOpenModal() {
    try {
      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const initialValues: ProductFormValues = {
    name: 'iae clauia',
    description: product?.description,
    photoUrl: product?.photoURL,
    price: product?.price,
    stock: product?.stock,
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(newProductSchema),
    defaultValues: initialValues,
  })

  return (
    <div>
      <FileSignature onClick={handleOpenModal} className='text-pear-900' />

      <Modal
        dismissible
        size='md'
        show={openModal}
        onClose={() => setOpenModal(false)}
        className='bg-pear-200/30 backdrop-blur-lg'
      >
        <Modal.Header className='flex text-pear-950 bg-pear-100 font-lato font-bold justify-between'>
          <h1 className='self-center text-pear-900 font-bold'>
            Editar produto
          </h1>
        </Modal.Header>
        <Modal.Body className='max-x-10 bg-pear-100'>{children}</Modal.Body>
      </Modal>
    </div>
  )
}
