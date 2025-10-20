// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYKDPTsP9W1bsknWBaNdZgOj11e3mbBOE",
  authDomain: "fir-conceptula.firebaseapp.com",
  projectId: "fir-conceptula",
  storageBucket: "fir-conceptula.firebasestorage.app",
  messagingSenderId: "90946347883",
  appId: "1:90946347883:web:aa53ef08ba0db3a2f6e22e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);