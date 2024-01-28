from flask import Flask, jsonify, render_template, request, session, redirect
from flask_socketio import join_room, leave_room, send, SocketIO
from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask
from flask_pymongo import PyMongo
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = os.environ.get("DATABASE_URL")
mongo = PyMongo(app)

@app.route('/', methods=['GET'])
def get_data():
    return jsonify({'message': 'Hello from Flask backend!'})


# TEST ROUTE TO SEE IF DATABASE IS CONNECTED
# @app.route('/test_db', methods=['GET'])
# def test_db():
#     try:
        
#         result = mongo.db.collection_name.find_one({'example_key': 'example_value'})
#         return jsonify({'message': f'Successfully connected to MongoDB. Result: {result}'}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error connecting to MongoDB: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)