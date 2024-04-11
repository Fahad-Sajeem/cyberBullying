document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pdfUrl = urlParams.get('pdfUrl');

    if (pdfUrl) {
        document.getElementById('pdfEmbed').src = pdfUrl;
        document.getElementById('downloadPdfLink').href = pdfUrl;
    } else {
        console.error('PDF URL not provided.');
    }
});
