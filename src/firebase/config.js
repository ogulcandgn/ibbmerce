import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBI3W8AyPI3R2xxRLdvN6v8JYnSo7PpSj4",
  authDomain: "u-ecommerce.firebaseapp.com",
  projectId: "u-ecommerce",
  storageBucket: "u-ecommerce.appspot.com",
  messagingSenderId: "413478826925",
  appId: "1:413478826925:web:43bfa3db0fc2115380a724",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
