document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');

    generateButton.addEventListener('click', async function () {
        const linkInput = document.getElementById('link');
        const linkText = linkInput.value.trim();

        // const youtubeUrlPattern = /^https?:\/\/(www\.youtube\.com\/watch\?v=|youtu\.be\/|m\.youtube\.com\/watch\?v=)[\w-]+(&[\w-]+)*$/;
        // const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&[\w-]+)*$/;
        const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+).*/;

        const match = linkText.match(youtubeUrlPattern);
        // youtubeUrlPattern.test(linkText)
        if (match) {
            const videoId = match[4];
            linkInput.value = ""; 

            alert('Valid YouTube URL: ' + videoId);

            try {
                const response = await fetch('http://127.0.0.1:5000/process_video_id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ videoId: videoId }),
                });

                const result = await response.json();
                console.log(result.message); 
                alert(`Predictions saved. Check server at: ${result.path}`);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to process video ID.');
            }

            

        } else {
            console.error('Invalid URL:', linkText);
            alert('Please enter a valid YouTube video URL.');
        }

    });
});