from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello from Flask backend!'})

if __name__ == '__main__':
    app.run(debug=True)
