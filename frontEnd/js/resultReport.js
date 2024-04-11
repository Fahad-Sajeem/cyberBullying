document.addEventListener('DOMContentLoaded', function() {
    // Function to get query parameters
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Get the PDF URL from the query parameters
    const pdfUrl = getQueryParam('pdfUrl');

    // Check if the PDF URL is present
    if (pdfUrl) {
        // Set the PDF URL as the source for the embed tag
        const pdfEmbed = document.querySelector('.pdf embed');
        if (pdfEmbed) {
            pdfEmbed.src = decodeURIComponent(pdfUrl);
        }
    } else {
        console.error('No PDF URL provided.');
    }
});