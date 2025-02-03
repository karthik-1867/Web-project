// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtmkswgH3ZHljqN5EsGidEiCC9dP4gMUY",
  authDomain: "video-app-39679.firebaseapp.com",
  projectId: "video-app-39679",
  storageBucket: "video-app-39679.firebasestorage.app",
  messagingSenderId: "607764589223",
  appId: "1:607764589223:web:2350270527d73030794982"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;