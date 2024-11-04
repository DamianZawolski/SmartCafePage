// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhjdbh0zX_NtW1QZk0rKINPNyo4Po3y_Q",
  authDomain: "smartcafe-2ad2d.firebaseapp.com",
  projectId: "smartcafe-2ad2d",
  storageBucket: "smartcafe-2ad2d.firebasestorage.app",
  messagingSenderId: "1018869454751",
  appId: "1:1018869454751:web:5c3161fa80adfb2bb08faa",
  measurementId: "G-GJ7WMY7PG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;