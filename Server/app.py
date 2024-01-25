from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask
from flask_pymongo import PyMongo
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/MS3_DB"
mongo = PyMongo(app)

if __name__ == '__main__':
    app.run(debug=True)



# @app.route('/', methods=['GET'])
# def get_data():
#     return jsonify({'message': 'Hello from Flask backend!'})

# @app.route('/test_db', methods=['GET'])
# def test_db():
#     try:

#         result = mongo.db.collection_name.find_one({'example_key': 'example_value'})
#         return jsonify({'message': f'Successfully connected to MongoDB. Result: {result}'}), 200
#     except Exception as e:
#         return jsonify({'message': f'Error connecting to MongoDB: {str(e)}'}), 500