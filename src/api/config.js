// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // jika Anda ingin menggunakan Firestore untuk history
import { getAuth } from "firebase/auth"; // jika Anda ingin menggunakan Firebase Auth

const firebaseConfig = {
    apiKey: "AIzaSyDFxBcsPwu346T5c3VJMDrMN8s8AeQ6YlU",
    authDomain: "simb-ppob.firebaseapp.com",
    projectId: "simb-ppob",
    storageBucket: "simb-ppob.firebasestorage.app",
    messagingSenderId: "624382810750",
    appId: "1:624382810750:web:9e2c3edfe1b17a26d2d62f",
    measurementId: "G-W48Y4M819T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore instance for database
const auth = getAuth(app); // Firebase Authentication instance

export { app, analytics, db, auth };