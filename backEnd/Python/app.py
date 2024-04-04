from flask import Flask, request, jsonify
from main import process_video_id  
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

@app.route('/process_video_id', methods=['POST'])
def receive_video_id():
    data = request.json
    videoId = data.get('videoId')
    
    if videoId:
        response_message = process_video_id(videoId)  # Call the function from main.py
        return jsonify({"message": response_message})
    else:
        return jsonify({"message": "No videoId provided"}), 400

if __name__ == "__main__":
    app.run(debug=True)
