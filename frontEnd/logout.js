import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signOut  } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


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

function handleSignOut(event) {
    event.preventDefault();
   
    signOut(auth)
       .then(() => {
         // Sign-out successful.
         window.location.href = "login.html"; // Redirect to the login page
       })
       .catch((error) => {
         //Error Occured
         console.error(error);
       });
   }
   
   const logout = document.getElementById('logoutButton');
   logout.addEventListener("click", handleSignOut);
   
   const sideLogout = document.getElementById('sideLogoutButton');
   sideLogout.addEventListener("click", handleSignOut);
