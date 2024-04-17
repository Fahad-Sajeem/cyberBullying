import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

document.addEventListener('DOMContentLoaded', function () {

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

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            const generateButton = document.getElementById('generateButton');
            generateButton.addEventListener('click', async function () {
                const linkInput = document.getElementById('link');
                const linkText = linkInput.value.trim();
                const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+).*/;

                const match = linkText.match(youtubeUrlPattern);
                if (match) {
                    const videoId = match[4];
                    linkInput.value = ""; // Clear the input field
                    generateButton.disabled = true; // Disable button
                    generateButton.textContent = "Loading...";
        
                    try {
                        const response = await fetch('http://127.0.0.1:5000/process_video_id', {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                            }),
                            body: JSON.stringify({ videoId: videoId, userId: user.uid }),
                        });

                        //
                        // // console.log('Before parsing JSON:', response);
                        // const result = await response.json();
                        // console.log('After parsing JSON:', result);
                        // // console.log(result.message);
                        // alert(`Predictions saved. Check server at: ${result.path}`);
                        // window.location.href = `result.html?pdfUrl=${encodeURIComponent(result.url)}`;
                        // // window.location.href = "https://www.google.com";
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        } else {
                            const result = await response.json();
                            console.log('After parsing JSON:', result);
                            alert(`Predictions saved. Check server at: ${result.path}`);
                            window.location.href = `result.html?pdfUrl=${encodeURIComponent(result.url)}`;
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Failed to process video ID.');
                    }finally {
                        generateButton.disabled = false; // Re-enable button
                        generateButton.textContent = "Generate"; // Reset button text
                    }
                } else {
                    console.error('Invalid URL:', linkText);
                    alert('Please enter a valid YouTube video URL.');
                }
            });
        } else {
            // User is signed out
            console.log('User is not signed in.');
            alert('Please sign in to process video ID.');
        }
    });
});
