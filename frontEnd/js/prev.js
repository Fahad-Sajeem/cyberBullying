// 
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

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

function retrieveAndDisplayPDFs(userId) {
    const storageRef = ref(storage, userId);

    listAll(storageRef).then(async function (result) {
        const filesData = [];
        for (const fileRef of result.items) {
            const metadata = await getMetadata(fileRef);
            const creationDate = new Date(metadata.timeCreated); // Convert to Date object

            filesData.push({ fileName: fileRef.name, creationDate });
        }

        // Sort files by creation date in descending order (latest first)
        filesData.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());

        filesData.forEach(async function (fileData) {
            const fileRef = ref(storage, userId + '/' + fileData.fileName);
            const url = await getDownloadURL(fileRef);
            displayPDF(fileData.fileName, url, fileData.creationDate);
        });
    }).catch(function (error) {
        console.error("Error listing PDFs:", error);
        alert('Failed to retrieve PDFs from Firebase Storage.');
    });
}

function displayPDF(fileName, url, creationDate) {
    const tableBody = document.getElementById('pdfTableBody');
    const row = tableBody.insertRow();

    const cellName = row.insertCell();

    const link = document.createElement('a');
    link.href = url;
    link.innerHTML = fileName; // Display PDF name as link text
    cellName.appendChild(link);
    const cellDate = row.insertCell();

    cellDate.innerHTML = creationDate.toLocaleDateString(); // Display creation date


}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        retrieveAndDisplayPDFs(userId);
    } else {
        console.log('User is not signed in.');
        alert('Please sign in to retrieve PDFs.');
    }
});
