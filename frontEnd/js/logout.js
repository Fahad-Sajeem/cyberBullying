import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

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

const logout = document.getElementById("logoutButton");
logout.addEventListener("click", handleSignOut);

const sideLogout = document.getElementById("sideLogoutButton");
sideLogout.addEventListener("click", handleSignOut);
