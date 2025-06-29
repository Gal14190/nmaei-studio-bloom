import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBW-pw-CgrFSnZH33843dGZEyZ7jneeC5I",
    authDomain: "nmproj-20894.firebaseapp.com",
    projectId: "nmproj-20894",
    storageBucket: "nmproj-20894.firebasestorage.app",
    messagingSenderId: "645152991715",
    appId: "1:645152991715:web:e6202be934110ea76498d6",
    measurementId: "G-RBSZ36YQV4"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export { db };