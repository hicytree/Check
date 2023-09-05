// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwufZZTqt1YtPKymsGSUyjWX3fUtPBr9s",
  authDomain: "check-4e4c4.firebaseapp.com",
  projectId: "check-4e4c4",
  storageBucket: "check-4e4c4.appspot.com",
  messagingSenderId: "607606510167",
  appId: "1:607606510167:web:e8d1988594d945bcf68912",
  measurementId: "G-V8057E8XFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };