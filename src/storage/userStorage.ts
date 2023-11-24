import { UserDTO } from '@src/dto/UserDTO'
import { auth, firestore } from '@src/services/firebase.config'
import { User } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

function emailOnCache(key: string): any | null {
  const objetoSerializado = localStorage.getItem(key)
  if (objetoSerializado) {
    return JSON.parse(objetoSerializado)
  } else {
    return null
  }
}

export function cleanCache(): void {
  localStorage.removeItem('email')
}

export async function getStoredUser(): Promise<UserDTO | undefined> {
  const userEmail = emailOnCache('email')

  try {
    if (!userEmail) return

    const docRef = doc(firestore, 'users', userEmail)

    const storedUser = await getDoc(docRef)

    return storedUser.data() as UserDTO
  } catch (error) {
    throw error
  }
}
