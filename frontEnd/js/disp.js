// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// import {
//   getAuth, showUserProfile
// } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBWvXfpM1gAA5nBPFauETnCfnuItBvx5mo",
//   authDomain: "cyber-login-a72ce.firebaseapp.com",
//   projectId: "cyber-login-a72ce",
//   storageBucket: "cyber-login-a72ce.appspot.com",
//   messagingSenderId: "433768429478",
//   appId: "1:433768429478:web:9dedffe819082888e6c167",
// };

  
// const auth = getAuth();
// const user = auth.currentUser;

// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;
 
//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
//  }

//  const user = firebase.auth().currentUser;
// if (user !== null) {
//  // The user object has basic properties such as display name, email, etc.
//  const displayName = user.displayName;
//  const email = user.email;
//  const photoURL = user.photoURL;
//  const emailVerified = user.emailVerified;

//  // The user's ID, unique to the Firebase project. Do NOT use
//  // this value to authenticate with your backend server, if
//  // you have one. Use User.getIdToken() instead.
//  const uid = user.uid;
// }

// if (user !== null) {
//   user.providerData.forEach((profile) => {
//      console.log("Sign-in provider: " + profile.providerId);
//      console.log(" Provider-specific UID: " + profile.uid);
//      console.log(" Name: " + profile.displayName);
//      console.log(" Email: " + profile.email);
//      console.log(" Photo URL: " + profile.photoURL);
//   });
//  }
 

// // Assuming you have already initialized Firebase in your project
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// import {
//   getAuth,
//   onAuthStateChanged,
// } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// import {getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBWvXfpM1gAA5nBPFauETnCfnuItBvx5mo",
//   authDomain: "cyber-login-a72ce.firebaseapp.com",
//   projectId: "cyber-login-a72ce",
//   storageBucket: "cyber-login-a72ce.appspot.com",
//   messagingSenderId: "433768429478",
//   appId: "1:433768429478:web:9dedffe819082888e6c167",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// onAuthStateChanged(auth, (user) => {
//  if (user) {
//     // User is signed in, fetch the user's name from Firestore
//     const userDoc = doc(db, "users", user.uid);
//     getDoc(userDoc).then((docSnapshot) => {
//       if (docSnapshot.exists()) {
//         const userData = docSnapshot.data();
//         // Update the sidebar with the user's name and email
//         document.getElementById('UserName').textContent = userData.name || 'User Name';
//         document.getElementById('UserEmail').textContent = user.email || 'User Email';
//       } else {
//         console.log("No such document!");
//       }
//     }).catch((error) => {
//       console.log("Error getting document:", error);
//     });
//  } else {
//     // No user is signed in
//     console.log('No user is signed in.');
//  }
// });
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWvXfpM1gAA5nBPFauETnCfnuItBvx5mo",
    authDomain: "cyber-login-a72ce.firebaseapp.com",
    projectId: "cyber-login-a72ce",
    storageBucket: "cyber-login-a72ce.appspot.com",
    messagingSenderId: "433768429478",
    appId: "1:433768429478:web:9dedffe819082888e6c167",
 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
console.log('onAuthStateChanged triggered');
 if (user) {
    const userDoc = doc(db, "users", user.uid);
    getDoc(userDoc).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        document.getElementById('UserName').textContent = userData.name || 'User Name';
        document.getElementById('UserEmail').textContent = user.email || 'User Email';
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
 } else {
    console.log('No user is signed in.');
 }
});

