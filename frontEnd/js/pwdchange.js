
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
 getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

const pwdDone = document.getElementById("pwdDone");
pwdDone.addEventListener("click", function (event) {
 event.preventDefault();

 const cpwd = document.getElementById("cpwd").value;
 const newpwd = document.getElementById("newpwd").value;
 const newpwd2 = document.getElementById("newpwd2").value;
 const user = auth.currentUser;

 if (newpwd !== newpwd2) {
    alert("Passwords do not match.");
    return; // Stop the function from proceeding
 }

 if (user) {
    const credential = EmailAuthProvider.credential(user.email, cpwd);

    reauthenticateWithCredential(user, credential)
      .then(() => {
        return updatePassword(user, newpwd);
      })
      .then(() => {
        alert("Password updated successfully.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
 } else {
    alert("No user is currently signed in.");
 }
});
