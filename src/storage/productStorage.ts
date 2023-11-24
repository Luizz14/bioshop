import { initializeApp } from 'firebase/app'
import { ProductDTO } from '../dto/ProductDTO'
import {
  addDoc,
  collection,
  getFirestore,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  DocumentSnapshot,
  limit,
  setDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { auth, firebaseConfig, firestore } from '@services/firebase.config'

const db = getFirestore()
const user = auth.currentUser

async function addProduct(product: ProductDTO) {
  try {
    await addDoc(collection(db, 'Products'), product)
    console.log('Itens add com sucesso!')
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}

function getProducsInRealTime(): Promise<ProductDTO[]> {
  return new Promise((resolve, reject) => {
    const q = query(collection(db, 'Products'))

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const products: ProductDTO[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductDTO[]

        unsubscribe()
        resolve(products)
      },
      reject
    )
  })
}

export function getNewProducts(): Promise<ProductDTO[]> {
  return new Promise((resolve, reject) => {
    const db = getFirestore()

    const q = query(collection(db, 'Products'), limit(3))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductDTO[]

      unsubscribe()
      resolve(products)
    })
    reject
  })
}

export async function updateProductById(productId: string, data: ProductDTO) {
  try {
    const productRef = doc(db, 'Products', productId)
    const productDoc = await getDoc(productRef)

    if (productDoc.exists()) {
      // Atualiza os dados do produto usando a função updateDoc
      await updateDoc(productRef, data)
    } else {
      throw new Error('Produto não encontrado.')
    }
  } catch (error) {
    throw error
  }
}

function getProductById(idProduct: string): Promise<ProductDTO> {
  return new Promise((resolve, reject) => {
    const unsub = onSnapshot(
      doc(db, 'Products', idProduct),
      (documentSnapshot: DocumentSnapshot) => {
        if (documentSnapshot.exists()) {
          const prod = documentSnapshot.data() as ProductDTO
          resolve(prod)
        } else {
          resolve({} as ProductDTO)
        }

        unsub()
      },
      reject
    )
  })
}

async function removeProductById(idProduct: string) {
  try {
    await deleteDoc(doc(db, 'Products', idProduct))
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}

export async function addToCart(productId: string, quantity: number) {
  // Obter o documento do usuário pelo seu id
  const product = await getProductById(productId)
  // doc(db, 'users', user?.email)
  const userRef = doc(collection(db, 'users'), user?.email as string)
  // await addDoc(collection(db, 'users'), doc('cart'), product)

  // userRef.
  // .get()
  // .then((doc) => {
  //   if (doc.exists) {
  //     // Obter o campo carrinho do documento do usuário
  //     var cart = doc.data().cart
  //     // Verificar se o produto já está no carrinho
  //     var index = cart.findIndex((item) => item.productId == productId)
  //     if (index > -1) {
  //       // Se o produto já está no carrinho, atualizar a quantidade
  //       cart[index].quantity += quantity
  //     } else {
  //       // Se o produto não está no carrinho, adicionar um novo item
  //       cart.push({ productId: productId, quantity: quantity })
  //     }
  //     // Atualizar o campo carrinho do documento do usuário
  //     userRef
  //       .doc(userId)
  //       .update({ cart: cart })
  //       .then(() => {
  //         console.log('Produto adicionado ao carrinho com sucesso!')
  //       })
  //       .catch((error) => {
  //         console.error('Erro ao adicionar produto ao carrinho: ', error)
  //       })
  //   }
  // })
  // .catch((error) => {
  //   console.error('Erro ao obter documento do usuário: ', error)
  // })
}

export { addProduct, removeProductById, getProductById, getProducsInRealTime }
