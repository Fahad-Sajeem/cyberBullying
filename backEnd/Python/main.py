from comments_retrieval import fetch_comments
from prediction import predict_comments  
from create_report import create_pdf
import pandas as pd
import os

def process_video_id(videoId):
    API_key = "AIzaSyBGTpbJlpXs195pbV1gDa11xKzdE2Nm_J0"
    # videoId = "riXpu1tHzl0"
    
    # Fetch comments and get them as a DataFrame
    comments_df = fetch_comments(videoId, API_key)
    # print(comments_df.head())
    
    # Apply predictions to the comments DataFrame
    predicted_df = predict_comments(comments_df)

    # calling function to convert the predicted to pdf file
    pdf_created = create_pdf(predicted_df)

    # saving the csv file to specified path
    save_dir = os.path.join(os.getcwd(),'backEnd','OutputFiles')    
    os.makedirs(save_dir, exist_ok=True)
    csv_file_path = os.path.join(save_dir, 'predicted_comment_out_7.csv')

    # Save the DataFrame with predictions to a new CSV file
    predicted_df.to_csv(csv_file_path, index=False)
    print(f"Predictions saved to {csv_file_path}")

    return pdf_created

