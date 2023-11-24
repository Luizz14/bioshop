'use client'

import * as yup from 'yup'

import { ProductDTO } from '@dto/ProductDTO'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addProduct } from '@storage/productStorage'
import Input from '@components/input'
import Button from '@components/button'
import { useState } from 'react'
import { Modal } from 'flowbite-react'

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

export default function FormNewProduct() {
  const [openModal, setOpenModal] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(newProductSchema),
  })

  async function handleAddNewProduct(data: ProductFormValues) {
    try {
      const newProduct: ProductDTO = {
        name: data.name,
        description: data.description,
        photoURL: data.photoUrl,
        price: data.price,
        sold: 0,
        rating: 0.0,
        stock: data.stock,
      }
      await addProduct(newProduct)
      setOpenModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button
        title='Adicionar novo produto'
        onClick={() => setOpenModal(true)}
      />
      <Modal
        dismissible
        size='md'
        show={openModal}
        onClose={() => setOpenModal(false)}
        className='bg-pear-200/30 backdrop-blur-lg'
      >
        <Modal.Header className='flex text-pear-950 bg-pear-100 font-lato font-bold justify-between'>
          <h1 className='self-center text-pear-900 font-bold'>Novo produto</h1>
        </Modal.Header>
        <Modal.Body className='max-x-10 bg-pear-100'>
          <form
            onSubmit={handleSubmit(handleAddNewProduct)}
            className='space-y-2'
          >
            <Controller
              name='name'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    placeholder='Nome'
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    errorMessage={errors.name?.message}
                    valid={isSubmitted && !errors.name}
                  />
                )
              }}
            />
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    placeholder='Descrição'
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    errorMessage={errors.description?.message}
                    valid={isSubmitted && !errors.description}
                  />
                )
              }}
            />
            <Controller
              name='photoUrl'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    placeholder='URL da imagem'
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    errorMessage={errors.photoUrl?.message}
                    valid={isSubmitted && !errors.photoUrl}
                  />
                )
              }}
            />
            <Controller
              name='price'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    placeholder='Preço'
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    errorMessage={errors.price?.message}
                    valid={isSubmitted && !errors.price}
                  />
                )
              }}
            />
            <Controller
              name='stock'
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    placeholder='Quantidade em estoque'
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    errorMessage={errors.stock?.message}
                    valid={isSubmitted && !errors.stock}
                  />
                )
              }}
            />

            <Button title='Adicionar' type='submit' />
            <Button
              title='Cancelar'
              buttonType='clean'
              type='button'
              onClick={() => setOpenModal(false)}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
