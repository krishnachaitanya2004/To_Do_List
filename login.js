

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";   
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js" ;

const firebaseConfig = {
  apiKey: "AIzaSyBUq5-WX4RfDi-bXZqJrDhkqfMfzRT05V8",
  authDomain: "fir-auth-7b1ef.firebaseapp.com",
  projectId: "fir-auth-7b1ef",
  storageBucket: "fir-auth-7b1ef.appspot.com",
  messagingSenderId: "961075776602",
  appId: "1:961075776602:web:e4923efc12dc5c3fb4dc63"
};

const app = initializeApp(firebaseConfig);
const button = document.getElementById("Login");

button.addEventListener("click", () => {
    const auth = getAuth();
    const emailInput = document.getElementById("input-email").value;
    const passwordInput = document.getElementById("input-password").value;
    
    signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
            sessionStorage.setItem("userEmail", user.email);
             window.location.href = "home.html";

            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("User not found");    
        });
});
