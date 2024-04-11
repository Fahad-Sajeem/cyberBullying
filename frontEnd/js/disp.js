import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth
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
  const app = firebase.initializeApp(firebaseConfig);
  function showUserProfile() 
    const user = firebase.auth().currentUser;
    if (user) {
      // User is signed in, update the sidebar with the user's name and email
      document.querySelector('.user h2').textContent = user.displayName || 'userName';
      document.querySelector('.user k').textContent = user.email || 'userEmail';
     } else {
      // No user is signed in
      console.log('No user is signed in.');
     }
     

function updateUserDetails() {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      document.getElementById('display-name').textContent = user.displayName;
      document.getElementById('email').textContent = user.email;
      document.getElementById('photo-url').textContent = user.photoURL;
      document.getElementById('email-verified').textContent = user.emailVerified;
    }
  }
  