// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkgEh4b55XpX9FhIBEr2bGcKfUwE7qvN0",
  authDomain: "blog-e987f.firebaseapp.com",
  projectId: "blog-e987f",
  storageBucket: "blog-e987f.appspot.com",
  messagingSenderId: "317410016968",
  appId: "1:317410016968:web:83710bf97091fd2d392ffd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)