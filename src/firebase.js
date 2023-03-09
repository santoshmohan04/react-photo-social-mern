// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth"; // for authentication
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import { getFirestore } from "firebase/firestore"; // for cloud firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu4-a8Mst56YKwYOLnJk-jWe7rhszPPVY",
  authDomain: "photo-social-mern-b649a.firebaseapp.com",
  projectId: "photo-social-mern-b649a",
  storageBucket: "photo-social-mern-b649a.appspot.com",
  messagingSenderId: "1025534291924",
  appId: "1:1025534291924:web:94d635008e7e2321ab7041",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
export {
  db,
  auth,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
