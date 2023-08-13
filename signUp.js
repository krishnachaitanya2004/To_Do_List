

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";   
import { getAuth, createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js" ;

const firebaseConfig = {
  apiKey: "AIzaSyBUq5-WX4RfDi-bXZqJrDhkqfMfzRT05V8",
  authDomain: "fir-auth-7b1ef.firebaseapp.com",
  projectId: "fir-auth-7b1ef",
  storageBucket: "fir-auth-7b1ef.appspot.com",
  messagingSenderId: "961075776602",
  appId: "1:961075776602:web:e4923efc12dc5c3fb4dc63"
};

const app = initializeApp(firebaseConfig);
const button = document.getElementById("signUp");
const signupGoogle = document.getElementById("GoogleSignUp");


button.addEventListener("click", () => {
    const auth = getAuth();
    const emailInput = document.getElementById("input-email").value;
    const passwordInput = document.getElementById("input-password").value;
    
    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                alert("Sign-up successful! You can now log in.");
                document.getElementById("input-email").value = ""; // Clear email input
                document.getElementById("input-password").value = ""; // Clear password input
                window.location.href = "login.html";
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Sign-up failed. Please try again.");
        });
});


signupGoogle.addEventListener("click",  () => {
const auth = getAuth();
const provider = new GoogleAuthProvider();
auth.languageCode = 'it';
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
   if(user){
    document.getElementById("input-email").value = ""; // Clear email input
    document.getElementById("input-password").value = ""; // Clear password input
    alert("Sign-up successful! You can now log in.");
    sessionStorage.setItem("userEmail", user.email);
    window.location.href = "home.html";

    // ...
   }
   
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
});

  