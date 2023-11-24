// AuthContext.tsx
'use client'

import { UserDTO } from '@src/dto/UserDTO'
import { auth } from '@src/services/firebase.config'
import { cleanCache, getStoredUser } from '@src/storage/userStorage'
import { User } from 'firebase/auth'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AuthContextType {
  user: UserDTO
  setLoggedUser: (data: User) => void
  //   signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function setLoggedUser() {
    const storedUser = await getStoredUser()
    if (!storedUser) return

    setUser(storedUser)
  }

  useEffect(() => {
    setLoggedUser()
  }, [])

  //   const signIn = async (email: string, password: string) => {
  //     await auth.signInWithEmailAndPassword(email, password)
  //   }

  const signOut = async () => {
    await auth.signOut()
    cleanCache()
  }

  const contextValue: AuthContextType = {
    user,
    setLoggedUser,
    // signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
