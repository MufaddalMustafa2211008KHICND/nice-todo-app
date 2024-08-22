import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDKe6SGEliK_wPKIua1_eO5VMXNDRG8iro',
  authDomain: 'authentication-84483.firebaseapp.com',
  projectId: 'authentication-84483',
  storageBucket: 'authentication-84483.appspot.com',
  messagingSenderId: '1001387320653',
  appId: '1:1001387320653:web:f3fb70908b2f9f51f3c304',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const database = getAuth(app)

export const firestore = getFirestore(app)
