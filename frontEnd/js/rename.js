
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, updateProfile } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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

const namedone = document.getElementById("namedone");
namedone.addEventListener("click", function (event) {
 event.preventDefault();

 const name = document.getElementById("newname").value;
 const user = auth.currentUser;

 if (user) {
    // Update the user's profile in Firebase Authentication
    updateProfile(user, {
      displayName: name
    }).then(() => {
      console.log("User name updated successfully!");
      alert("User name updated successfully");

      // Update the user's document in Firestore
      return setDoc(doc(db, "users", user.uid), {
        name: name,
      }, { merge: true }); // Use { merge: true } to update only the specified fields
    }).then(() => {
      // After updating the document
      alert("Name updated successfully in Firestore.");
      // Update the user's name on the website
      document.getElementById('UserName').textContent = name;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
 } else {
    alert("No user is currently signed in.");
 }
});

