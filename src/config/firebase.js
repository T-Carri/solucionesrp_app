import {  getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdYqOh401f6fuV5x4DvgPvZPnsGes50CE",
  authDomain: "solucionesrp-control.firebaseapp.com",
  projectId: "solucionesrp-control",
  storageBucket: "solucionesrp-control.appspot.com",
  messagingSenderId: "815754877243",
  appId: "1:815754877243:web:de414804b558bbd459ff1e"
};

// Initialize Firebaseconst
//const app = initializeApp(firebaseConfig)

// Initialize Firebase for SSR

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase services
//const firestore = getFirestore(app)
const auth = getAuth(app)
const db = getFirestore(app)
// Expose the instances we'll need
export { app,  auth, db  }