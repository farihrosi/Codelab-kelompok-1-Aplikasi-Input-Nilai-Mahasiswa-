// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCEfiCv28KqF-Q0ahxY9BrdCSYAVsfzJBw",
    authDomain: "crud-simple-abed5.firebaseapp.com",
    projectId: "crud-simple-abed5",
    storageBucket: "crud-simple-abed5.firebasestorage.app",
    messagingSenderId: "1057041021950",
    appId: "1:1057041021950:web:43241cd16e7320c9c79eaf",
    measurementId: "G-ET699X62J1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export { db };
