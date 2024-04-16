import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
    const db = getFirestore(app);

    async function fetchUsername(userId) {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            return docSnap.data().name;  // Assuming 'username' is the field where the user's name is stored
        } else {
            console.log("No such document!");
            return null;
        }
    }

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
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                document.getElementById('sendtobtn').addEventListener('click', async function() {
                    let email = 'example@gmail.com';
                    const username = await fetchUsername(user.uid);
                    const urk = await getDownloadURL(storageRef);
                    let subject = encodeURIComponent('Cyberbullying Report Submission');
                    let body = encodeURIComponent(
                        `Dear Cyber Security Authorities,\n\n` +
                        `This email is to inform you about a cyberbullying incident that has been detected by our automated monitoring systems. ` +
                        `The report includes comments that have been flagged as offensive, providing details on the commenter, the content of the comments, and an assessment of the offensive nature.\n\n` +
                        `Username of reporting individual: ${username}\n` +
                        `Please review the attached detailed report to take the necessary actions according to your protocols and guidelines.\n\n` +
                        `The detailed report can be accessed via the following link: ${urk}\n\n` +
                        `We appreciate your attention to this matter and are committed to supporting a safe and respectful online environment.\n\n` +
                        `Kind Regards,\n` +
                        `${username} (on behalf of [Your Organization's Name or System Name])`  // Replace [Your Organization's Name or System Name] with your actual organization or system name
                    );
                
                    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                });
            } else {
                // User is signed out
                console.log('User is not signed in.');
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