'use client'

import Button from '@src/components/button'
import { ProductDTO } from '@src/dto/ProductDTO'
import { getProductById, removeProductById } from '@src/storage/productStorage'
import { Modal } from 'flowbite-react'
import { Trash } from 'lucide-react'
import { useState } from 'react'

import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DeleteButton({
  productId,
  name,
}: {
  productId: string
  name: string
}) {
  const [openExcludeModal, setOpenExcludeModal] = useState(false)

  async function handleRemoveProduct() {
    try {
      await removeProductById(productId)
      setOpenExcludeModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Trash
        className='text-pear-900'
        onClick={() => setOpenExcludeModal(true)}
      />

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
              <span className='text-pear-900 font-bold'>{name}</span>?
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
    </div>
  )
}
