import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
const db = getFirestore(app);

const signup = document.getElementById("signUpButton");
signup.addEventListener("click", function (event) {
  event.preventDefault();
  // alert("Enter the required details !!")

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });

      alert("Creating Account...");
      window.location.href = "homePage.html";

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
