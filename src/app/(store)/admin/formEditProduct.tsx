'use client'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'

import Input from '@src/components/input'
import { getProductById, updateProductById } from '@src/storage/productStorage'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@src/components/button'
import { useEffect, useState } from 'react'
import { ProductDTO } from '@src/dto/ProductDTO'

interface FormEditProduct {
  id: string
}

export default function FormEditProduct({ id }: FormEditProduct) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  async function getProduct() {
    try {
      const responseProduct = await getProductById(id)

      setName(responseProduct.name)
      setDescription(responseProduct.description)
      setPhotoURL(responseProduct.photoURL)
      setPrice(responseProduct.price)
      setStock(responseProduct.stock)
      console.log(name)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleEditProduct() {
    try {
      const data: ProductDTO = {
        name,
        description,
        photoURL,
        price,
        stock,
      }
      await updateProductById(id, data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <form onSubmit={handleEditProduct} className='space-y-2'>
      <Input
        placeholder='Nome'
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Input
        placeholder='Descrição'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <Input
        placeholder='Url da foto'
        onChange={(e) => setPhotoURL(e.target.value)}
        value={photoURL}
      />
      <Input
        type='number'
        placeholder='Preço'
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        value={price}
      />

      <Input
        type='number'
        placeholder='Estoque'
        onChange={(e) => setStock(parseFloat(e.target.value))}
        value={stock}
      />

      <Button title='Atualizar' type='submit' />
      <Button
        title='Cancelar'
        buttonType='clean'
        type='button'
        // onClick={() => setOpenModal(false)}
      />
    </form>
  )
}
