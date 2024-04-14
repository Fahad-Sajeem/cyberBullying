import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

document.addEventListener('DOMContentLoaded', function () {

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
    const storage = getStorage(app);


    // Function to get query parameters
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the PDF URL from the query parameters
    const fullUrl = getQueryParam('pdfUrl');
    if (fullUrl) {
        const parts = fullUrl.split('/o/');
        let pdfPath = parts.length > 1 ? parts[1].split('?')[0] : null;
        if (pdfPath) {
            const storageRef = ref(storage, pdfPath);
            getDownloadURL(storageRef).then(function (url) {
                const pdfEmbed = document.getElementById('pdfEmbed');
                const downloadBtn = document.getElementById('downloadbtn');
                const previewBtn = document.getElementById('previewbtn');
                if (pdfEmbed) {
                    pdfEmbed.src = url;
                }
                
                if (downloadBtn) {
                    downloadBtn.addEventListener('click', function () {
                        // e.preventDefault(); // Prevent the default anchor behavior
                        if (url !== '') {
                            let a = document.createElement("a");
                            // Create a temporary anchor element and trigger a download
                            // const tempLink = document.createElement('a');
                            // tempLink.href = url;
                            // tempLink.setAttribute('download', 'Report.pdf'); // Set the filename for the download
                            // tempLink.style.display = 'none';
                            // document.body.appendChild(tempLink);
                            // tempLink.click(); // Programmatically click the link to trigger the download
                            // document.body.removeChild(tempLink); // Clean up
                            a.download = "Report.pdf";
                            a.href = url;
                            a.textContent = "booking-details.json";
                            a.click();
                        } else {
                            window.alert("No PDF to download");
                        }
                    });
                }
                previewBtn.addEventListener('click', function () {
                    if (pdfEmbed) {
                        window.open(url, '_blank'); // Opens PDF in a new tab for preview
                    }
                });
            }).catch(function (error) {
                console.error("Error getting download URL: ", error);
            });
        } else {
            console.error("No valid PDF path provided.");
        }
    }
});