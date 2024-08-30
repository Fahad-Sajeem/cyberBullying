from google.cloud import translate_v2 as translate
import googleapiclient.discovery
import pandas as pd
import os

def fetch_comments(videoId, API_key):
    # Initialize the YouTube API client
    api_service_name = "youtube"
    api_version = "v3"
    youtube = googleapiclient.discovery.build(api_service_name, api_version, developerKey=API_key)

    # Initialize the Translation API client
    translator = translate.Client()

    request = youtube.commentThreads().list(
        part="snippet",
        videoId=videoId,
        maxResults=100
    )
    response = request.execute()

    authors = []
    comments = []
    for item in response['items']:
        comment = item['snippet']['topLevelComment']['snippet']
        author = comment['authorDisplayName']
        original_comment = comment['textDisplay']
        
        # Detect the language of the comment
        detected_lang = translator.detect_language(original_comment)['language']
        
        # Translate if not English
        translated_comment = original_comment
        if detected_lang != 'en':
            translation = translator.translate(original_comment, target_language='en')
            translated_comment = translation['translatedText']
            # Debug print for translated comment
        
        authors.append(author)
        comments.append(translated_comment)


    comments_df = pd.DataFrame({
        'Author': authors,
        'Comment': comments
    })
    return comments_df
