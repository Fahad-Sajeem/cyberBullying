# AIzaSyBGTpbJlpXs195pbV1gDa11xKzdE2Nm_J0

import googleapiclient.discovery
import googleapiclient.errors
import csv

api_service_name = "youtube"
api_version = "v3"
API_key = ""

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=API_key)

request = youtube.commentThreads().list(
    part="snippet",
    videoId="",
    maxResults=100
)
response = request.execute()

comments = []

for item in response['items']:
    comment = item['snippet']['topLevelComment']['snippet']
    comments.append([
        comment['authorDisplayName'],
        comment['textDisplay']
    ])

with open('comments.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)

    # Write the header row
    writer.writerow(['Author', 'Comment'])

    # Write each comment and author to the CSV file
    writer.writerows(comments)

