const firebaseConfig = {
    // Your firebase configuration data
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  function showUserProfile() {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      console.log("Display Name -", displayName, ", Email -", email, ", EmailVerified - ", emailVerified, " ,Photo Url -", photoURL);
    }
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
  