document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pdfUrl = urlParams.get('pdfUrl');
    if (pdfUrl) {
        const pdfEmbed = document.getElementById('pdfEmbed');
        if (pdfEmbed) {
            pdfEmbed.src = decodeURIComponent(pdfUrl);
        }
    }
});