from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_pymongo import PyMongo
import os
import psycopg2

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)
CORS(app)

@app.route("/")
def home_page():
    online_users = mongo.db.users.find({"online": True})
    return render_template("index.html",
        online_users=online_users)



# @app.route('/', methods=['GET'])
# def get_data():
#     return jsonify({'message': 'Hello from Flask backend!'})

if __name__ == '__main__':
    app.run(debug=True)
