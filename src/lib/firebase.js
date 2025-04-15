import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnVBXij8g7zrcCjd48cSxfB_pP08f8m3w",
    authDomain: "meal-planner-79e0c.firebaseapp.com",
    projectId: "meal-planner-79e0c",
    storageBucket: "meal-planner-79e0c.firebasestorage.app",
    messagingSenderId: "640170834934",
    appId: "1:640170834934:web:cc8409f1ec0ae609d9a5d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
