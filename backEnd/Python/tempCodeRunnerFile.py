from flask import Flask, request, jsonify
from main import process_video_id  
from flask_cors import CORS
import firebase_admin  
from firebase_admin import credentials, firestore, storage
import os
from urllib.parse import quote

project_root = os.getcwd()
json_file_path = os.path.join(project_root, "backEnd", "Python", "json", "cyber-login-a72ce-firebase-adminsdk-ktx5b-b75b404aee (1).json")
cred = credentials.Certificate(json_file_path)
"path/cyber-login-a72ce-firebase-adminsdk-ktx5b-b75b404aee (1).json"
firebase_admin.initialize_app(cred, {
    'apiKey': '',
    'authDomain': '',
    'projectId': '',
    'storageBucket': '',
    'messagingSenderId': '',
    'appId': ''
})

app = Flask(__name__)
CORS(app)  

@app.route('/process_video_id', methods=['POST'])
def receive_video_id():
    data = request.json
    videoId = data.get('videoId')
    userId = data.get('userId')
    
    if videoId:
        # print("The given user id is:", userId)
        pdf_bytes = process_video_id(videoId)  # Call the function from main.py
        bucket = storage.bucket()
        blob = bucket.blob(f'{userId}/{videoId}.pdf')
        blob.upload_from_string(pdf_bytes.getvalue(), content_type='application/pdf')
        pdf_url = f'https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{quote(blob.name)}?alt=media'
    
        return jsonify({"message": "PDF generated and uploaded successfully", "url": pdf_url})
    else:
        return jsonify({"message": "No videoId provided"}), 400

if __name__ == "__main__":
    app.run(debug=True)
