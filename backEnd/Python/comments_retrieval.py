# AIzaSyBGTpbJlpXs195pbV1gDa11xKzdE2Nm_J0

# import googleapiclient.discovery
# import googleapiclient.errors
# import pandas as pd

# def fetch_comments(videoId,API_key):
#     api_service_name = "youtube"
#     api_version = "v3"

#     youtube = googleapiclient.discovery.build(
#         api_service_name, api_version, developerKey=API_key)

#     request = youtube.commentThreads().list(
#         part="snippet",
#         videoId=videoId,
#         maxResults=100
#     )
#     response = request.execute()

#     authors = []
#     comments = []

#     for item in response['items']:
#         comment = item['snippet']['topLevelComment']['snippet']
#         authors.append(comment['authorDisplayName'])
#         comments.append(comment['textDisplay'])

#     comments_df = pd.DataFrame({
#         'Author':authors,
#         'Comment':comments
#     })

#     return comments_df

#########################################################################################################

# import googleapiclient.discovery
# import googleapiclient.errors
# import pandas as pd
# from googletrans import Translator, LANGUAGES
# import os

# def fetch_comments(videoId, API_key):
#     api_service_name = "youtube"
#     api_version = "v3"
#     youtube = googleapiclient.discovery.build(api_service_name, api_version, developerKey=API_key)

#     request = youtube.commentThreads().list(
#         part="snippet",
#         videoId=videoId,
#         maxResults=100
#     )
#     response = request.execute()

#     translator = Translator()
#     authors = []
#     comments = []

#     for item in response['items']:
#         comment = item['snippet']['topLevelComment']['snippet']
#         authors.append(comment['authorDisplayName'])
#         original_comment = comment['textDisplay']
        
#         # Attempt to detect the language of the comment
#         detected_lang = translator.detect(original_comment).lang
        
#         # If the detected language is not English, translate the comment to English
#         translated_comment = original_comment
#         if detected_lang != 'en':
#             translated_comment = translator.translate(original_comment, dest='en').text
        
#         comments.append(translated_comment)

#     comments_df = pd.DataFrame({
#         'Author': authors,
#         'Comment': comments
#     })

#     save_dir = os.path.join(os.getcwd(),'backEnd','OutputFiles')    
#     os.makedirs(save_dir, exist_ok=True)
#     csv_file_path = os.path.join(save_dir, 'translated_comments_1.csv')

#     # Save the DataFrame with predictions to a new CSV file
#     comments_df.to_csv(csv_file_path, index=False)
#     print(f"Predictions saved to {csv_file_path}")

#     return comments_df

#####################################################################################################

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

    # for item in response['items']:
    #     comment = item['snippet']['topLevelComment']['snippet']
    #     authors.append(comment['authorDisplayName'])
    #     original_comment = comment['textDisplay']
        
    #     # Detect the language of the comment
    #     detected_lang = translator.detect_language(original_comment)['language']
        
    #     # If the detected language is not English, translate the comment to English
    #     translated_comment = original_comment
    #     if detected_lang != 'en':
    #         translation = translator.translate(original_comment, target_language='en')
    #         translated_comment = translation['translatedText']
        
    #     comments.append(translated_comment)
    for item in response['items']:
        comment = item['snippet']['topLevelComment']['snippet']
        author = comment['authorDisplayName']
        original_comment = comment['textDisplay']
        
        # Detect the language of the comment
        detected_lang = translator.detect_language(original_comment)['language']
        
        # Debug print
        # print(f"Original: {original_comment} (Lang: {detected_lang})")
        
        # Translate if not English
        translated_comment = original_comment
        if detected_lang != 'en':
            translation = translator.translate(original_comment, target_language='en')
            translated_comment = translation['translatedText']
            # Debug print for translated comment
            # print(f"Translated: {translated_comment}")
        
        authors.append(author)
        comments.append(translated_comment)


    comments_df = pd.DataFrame({
        'Author': authors,
        'Comment': comments
    })

    save_dir = os.path.join(os.getcwd(),'backEnd','OutputFiles')    
    os.makedirs(save_dir, exist_ok=True)
    csv_file_path = os.path.join(save_dir, 'translated_comments_3.csv')

    # Save the DataFrame with predictions to a new CSV file
    comments_df.to_csv(csv_file_path, index=False)
    print(f"Predictions saved to {csv_file_path}")

    return comments_df
