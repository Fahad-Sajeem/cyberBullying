import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

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
