/* eslint-disable */
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAsvnCGC0B_em65ACQ17W_BI_MftwM1m70",
  authDomain: "days-3ec6c.firebaseapp.com",
  databaseURL:
    "https://days-3ec6c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "days-3ec6c",
  storageBucket: "days-3ec6c.appspot.com",
  messagingSenderId: "658113880913",
  appId: "1:658113880913:web:571815e133dcc1cced2970",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export { auth, db }
