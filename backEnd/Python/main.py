from comments_retrieval import fetch_comments
from prediction import predict_comments  
from create_report import create_pdf
import pandas as pd
import os

def process_video_id(videoId):
    API_key = "youtubeAPI"
    
    # Fetch comments and get them as a DataFrame
    comments_df = fetch_comments(videoId, API_key)
    # print(comments_df.head())
    
    # Apply predictions to the comments DataFrame
    predicted_df = predict_comments(comments_df)

    # calling function to convert the predicted to pdf file
    pdf_created = create_pdf(predicted_df)

    return pdf_created

