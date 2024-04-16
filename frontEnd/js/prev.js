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

// function displayPDF(fileName, url, creationDate) {
//     const tableBody = document.getElementById('pdfTableBody');
//     const row = tableBody.insertRow();

//     const cellName = row.insertCell();

//     const link = document.createElement('a');
//     link.href = url;
//     link.innerHTML = fileName; // Display PDF name as link text
//     cellName.appendChild(link);
//     const cellDate = row.insertCell();

//     cellDate.innerHTML = creationDate.toLocaleDateString(); // Display creation date


// }

// Function to display PDF in table
// function displayPDF(fileName, url, creationDate) {
//     const tableBody = document.getElementById('pdfTableBody');
//     const row = tableBody.insertRow();

//     const cellName = row.insertCell();
//     const link = document.createElement('a');
//     link.href = url;
//     link.innerHTML = fileName; // Display PDF name as link text
//     cellName.appendChild(link);

//     const cellDate = row.insertCell();
//     cellDate.innerHTML = creationDate.toLocaleDateString(); // Display creation date

//     const cellActions = row.insertCell();
//     const previewButton = document.createElement('a');
//     previewButton.href = "#"; // Add link for preview functionality
//     previewButton.textContent = "Preview"; // Label for preview button
//     previewButton.classList.add('preview-button'); // Add class for styling
//     previewButton.addEventListener('click', function() {
//         // Implement preview functionality here
//         console.log("Preview button clicked for " + fileName);
//     });
//     cellActions.appendChild(previewButton);

//     const sendButton = document.createElement('a');
//     sendButton.href = "#"; // Add link for sending mail functionality
//     sendButton.textContent = "Send Mail"; // Label for send mail button
//     sendButton.classList.add('send-button'); // Add class for styling
//     sendButton.addEventListener('click', function() {
//         // Implement send mail functionality here
//         console.log("Send mail button clicked for " + fileName);
//     });
//     cellActions.appendChild(sendButton);
// }
// document.getElementById('preview-button').addEventListener('click', function () {
//     if (pdfEmbed) {
//         window.open(url, '_blank'); // Opens PDF in a new tab for preview
//     }
// });

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const userId = user.uid;
//         retrieveAndDisplayPDFs(userId);
//     } else {
//         console.log('User is not signed in.');
//         alert('Please sign in to retrieve PDFs.');
//     }
//     if (user) {
//         document.getElementById('send-button').addEventListener('click', async function() {
//             let email = 'example@gmail.com';
//             const username = await fetchUsername(user.uid);
//             const urk = await getDownloadURL(storageRef);
//             let subject = encodeURIComponent('Cyberbullying Report Submission');
//             let body = encodeURIComponent(
//                 `Dear Cyber Security Authorities,\n\n` +
//                 `This email is to inform you about a cyberbullying incident that has been detected by our automated monitoring systems. ` +
//                 `The report includes comments that have been flagged as offensive, providing details on the commenter, the content of the comments, and an assessment of the offensive nature.\n\n` +
//                 `Username of reporting individual: ${username}\n` +
//                 `Please review the attached detailed report to take the necessary actions according to your protocols and guidelines.\n\n` +
//                 `The detailed report can be accessed via the following link: ${urk}\n\n` +
//                 `We appreciate your attention to this matter and are committed to supporting a safe and respectful online environment.\n\n` +
//                 `Kind Regards,\n` +
//                 `${username} (on behalf of [Your Organization's Name or System Name])`  // Replace [Your Organization's Name or System Name] with your actual organization or system name
//             );
        
//             window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
//         });
//     } else {
//         // User is signed out
//         console.log('User is not signed in.');
//     }
// });

// Function to display PDF in table
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

    const cellActions = row.insertCell();
    const previewButton = document.createElement('a');
    previewButton.href = "#"; // Add link for preview functionality
    previewButton.textContent = "Preview"; // Label for preview button
    previewButton.classList.add('preview-button'); // Add class for styling
    previewButton.addEventListener('click', function() {
        // Open PDF in a new tab for preview
        window.open(url, '_blank');
    });
    cellActions.appendChild(previewButton);

    const sendButton = document.createElement('a');
    sendButton.href = "#"; // Add link for sending mail functionality
    sendButton.textContent = "Send Mail"; // Label for send mail button
    sendButton.classList.add('send-button'); // Add class for styling
    sendButton.addEventListener('click', function() {
        // Construct email body and open mailbox to send
        let email = 'example@gmail.com';
        let subject = encodeURIComponent('Cyberbullying Report Submission');
        let body = encodeURIComponent(
            `Dear Cyber Security Authorities,\n\n` +
            `This email is to inform you about a cyberbullying incident that has been detected by our automated monitoring systems. ` +
            `The report includes comments that have been flagged as offensive, providing details on the commenter, the content of the comments, and an assessment of the offensive nature.\n\n` +
            `Please review the attached detailed report to take the necessary actions according to your protocols and guidelines.\n\n` +
            `The detailed report can be accessed via the following link: ${url}\n\n` +
            `We appreciate your attention to this matter and are committed to supporting a safe and respectful online environment.\n\n` +
            `Kind Regards,\n` +
            `[Your Organization's Name or System Name]` // Replace [Your Organization's Name or System Name] with your actual organization or system name
        );

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
    cellActions.appendChild(sendButton);
}

// Firebase authentication state change listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userId = user.uid;
        retrieveAndDisplayPDFs(userId);
    } else {
        console.log('User is not signed in.');
        alert('Please sign in to retrieve PDFs.');
    }
});

