import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyBzmseek0RjhZ5QSrTGxXsQIjZEk5Tb_kI',
  authDomain: 'fashiontrendseps.firebaseapp.com',
  projectId: 'fashiontrendseps',
  storageBucket: 'fashiontrendseps.appspot.com',
  messagingSenderId: '943877035520',
  appId: '1:943877035520:web:6ef57a9e27b2c7f5c92ae5',
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const firestore = getFirestore()
export const auth = getAuth(app)
