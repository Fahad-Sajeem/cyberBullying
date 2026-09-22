import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = document.getElementById("signUpButton");
signup.addEventListener("click", function (event) {
  event.preventDefault();
  // alert("Enter the required details !!")

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  if (password !== password2) {
    alert("Passwords do not match.");
    return; // Stop the function from proceeding
  }
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      return setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });

      // alert("Creating Account...");
      // window.location.href = "homePage.html";

    })
    .then(() => {
      // After setting document
      alert("Account created successfully.");
      window.location.href = "homePage.html";
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
