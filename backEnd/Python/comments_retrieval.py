# AIzaSyBGTpbJlpXs195pbV1gDa11xKzdE2Nm_J0

import googleapiclient.discovery
import googleapiclient.errors
import pandas as pd

def fetch_comments(videoId,API_key):
    api_service_name = "youtube"
    api_version = "v3"
    # API_key = "AIzaSyBGTpbJlpXs195pbV1gDa11xKzdE2Nm_J0"

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=API_key)

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
        authors.append(comment['authorDisplayName'])
        comments.append(comment['textDisplay'])

    comments_df = pd.DataFrame({
        'Author':authors,
        'Comment':comments
    })

    return comments_df

