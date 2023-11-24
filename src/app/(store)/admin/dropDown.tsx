'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Dropdown, Modal } from 'flowbite-react'

import * as yup from 'yup'

import Button from '@src/components/button'
import { getProductById, removeProductById } from '@src/storage/productStorage'

import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { ProductDTO } from '@src/dto/ProductDTO'
import { Controller, useForm } from 'react-hook-form'
import Input from '@src/components/input'
import { yupResolver } from '@hookform/resolvers/yup'

interface DropDownProps {
  productId?: string
  productName: string
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

export function DropDown({ productId, productName }: DropDownProps) {
  const [openExcludeModal, setOpenExcludeModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO)

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

  async function handleRemoveProduct() {
    try {
      if (productId) await removeProductById(productId)
      setOpenExcludeModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function getProduct() {
    try {
      const product = await getProductById(productId as string)

      if (product) {
        setProduct(product)
        setTimeout(() => setOpenEditModal(true), 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEditProduct() {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProduct()
  })

  return (
    <>
      <Dropdown
        label=''
        dismissOnClick={false}
        renderTrigger={() => <Menu className='text-pear-500' />}
        className='bg-pear-100 border-pear-50'
      >
        <Dropdown.Item
          onClick={async () => await getProduct()}
          className='text-pear-600'
        >
          Editar
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setOpenExcludeModal(true)}
          className='text-red-800 font-bold'
        >
          Remover
        </Dropdown.Item>
      </Dropdown>

      <Modal
        show={openExcludeModal}
        size='md'
        onClose={() => setOpenExcludeModal(false)}
        className='bg-pear-200/30 backdrop-blur-lg items-center justify-center ease-in-out duration-300'
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-red-400 dark:text-gray-200' />
            <h1 className='mb-5 text-lg font-lato font-normal text-pear-700 dark:text-gray-400'>
              Tem certeza que deseja deletar <br />
              <span className='text-pear-900 font-bold'>{productName}</span>?
            </h1>
            <div className='flex justify-center gap-4'>
              <Button
                title='Sim, tenho certeza'
                className='text-red-500 font-bold font-lato'
                onClick={handleRemoveProduct}
              />

              <Button
                title='Não, cancelar'
                className='text-green-500 font-bold font-lato'
                buttonType='default'
                onClick={() => setOpenExcludeModal(false)}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        size='md'
        show={openEditModal}
        onClose={() => setOpenEditModal(false)}
        className='bg-pear-200/30 backdrop-blur-lg'
      >
        <Modal.Header className='flex text-pear-950 bg-pear-100 font-lato font-bold justify-between'>
          <h1 className='self-center text-pear-900 font-bold'>
            Editar produto
          </h1>
        </Modal.Header>
        <Modal.Body className='max-x-10 bg-pear-100'>
          <form
            onSubmit={handleSubmit(handleEditProduct)}
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

            <Button title='Atualizar' type='submit' />
            <Button
              title='Cancelar'
              buttonType='clean'
              type='button'
              onClick={() => setOpenEditModal(false)}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
