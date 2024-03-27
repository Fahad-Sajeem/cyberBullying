import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWvXfpM1gAA5nBPFauETnCfnuItBvx5mo",
  authDomain: "cyber-login-a72ce.firebaseapp.com",
  projectId: "cyber-login-a72ce",
  storageBucket: "cyber-login-a72ce.appspot.com",
  messagingSenderId: "433768429478",
  appId: "1:433768429478:web:9dedffe819082888e6c167"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const login=document.getElementById('loginButton');
login.addEventListener("click",function(event) {
  event.preventDefault()
  // alert("Enter the required details !!")

//   const name= document.getElementById('name').value;
  const email= document.getElementById('email').value;
  const password= document.getElementById('password').value;
//   const password2= document.getElementById('password2').value;

  signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed up 
  const user = userCredential.user;
//   alert("login in...")
  window.location.href="homePage.html";
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage)
  // ..
});


})
