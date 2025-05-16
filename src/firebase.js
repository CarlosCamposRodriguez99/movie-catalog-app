// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7ehTuUGnjA2kQXHL8KM1tB0ULn5s4b-0",
  authDomain: "moviesapp-c5e1c.firebaseapp.com",
  projectId: "moviesapp-c5e1c",
  storageBucket: "moviesapp-c5e1c.firebasestorage.app",
  messagingSenderId: "435844258125",
  appId: "1:435844258125:web:a468fa52834b39da8dbf04"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
