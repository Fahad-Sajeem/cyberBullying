import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWvXfpM1gAA5nBPFauETnCfnuItBvx5mo",
  authDomain: "cyber-login-a72ce.firebaseapp.com",
  projectId: "cyber-login-a72ce",
  storageBucket: "cyber-login-a72ce.appspot.com",
  messagingSenderId: "433768429478",
  appId: "1:433768429478:web:9dedffe819082888e6c167",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = document.getElementById("loginButton");
login.addEventListener("click", function (event) {
  event.preventDefault();

  //   const name= document.getElementById('name').value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  //   const password2= document.getElementById('password2').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sign up successful
      const user = userCredential.user;
      window.location.href = "homePage.html";
    })
    .catch((error) => {
      // Error occured
      const errorCode = error.code;
      console.log(errorCode);
      if (error.code === "auth/invalid-email") {
        alert("Enter a valid email");
      } else if (error.code === "auth/missing-password") {
        alert("Enter a valid password");
      } else if (error.code === "auth/invalid-credential") {
        alert("Email/Password is incorrect. Please try again.");
      } else {
        alert("Error occurred. Please try again.");
      }
    });
});
