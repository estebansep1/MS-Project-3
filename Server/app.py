# app.py
from flask import Flask, jsonify, request, session
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from bson import ObjectId
from models import User, Chatroom
import secrets

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config.from_object('config.Config')

mongo = PyMongo(app)
bcrypt = Bcrypt(app)

app.secret_key = secrets.token_hex(16)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    # Check if the username is already taken
    if User.find(username):
        return jsonify({'message': 'Username already taken'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert user into the database
    user_id = User.create(username, hashed_password)

    return jsonify({'message': 'User registered successfully!', 'user_id': str(user_id)}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    # Check if the user exists
    user = User.find(username)

    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid username or password'}), 401

    # Create a session for the logged-in user
    session['user_id'] = str(user['_id'])
    return jsonify({'message': 'User logged in successfully!'}), 200

@app.route('/logout', methods=['POST'])
def logout():
    # Clear the session to log out the user
    session.clear()
    return jsonify({'message': 'User logged out successfully!'}), 200

@app.route('/create_chatroom', methods=['POST'])
def create_chatroom():
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in'}), 401

    data = request.get_json()
    title = data.get('title')

    # Create a new chatroom
    chatroom_id = Chatroom.create(title)

    return jsonify({'message': 'Chatroom created successfully!', 'chatroom_id': str(chatroom_id)}), 201

@app.route('/get_chatrooms', methods=['GET'])
def get_chatrooms():
    chatrooms = Chatroom.get_all()
    return jsonify({'chatrooms': list(chatrooms)}), 200

@app.route('/send_message', methods=['POST'])
def send_message():
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in'}), 401

    data = request.get_json()
    chatroom_id = data.get('chatroom_id')
    message = data.get('message')

    # Add the message to the chatroom
    Chatroom.add_message(ObjectId(chatroom_id), session['user_id'], message)

    return jsonify({'message': 'Message sent successfully!'}), 201

@app.route('/get_messages/<string:chatroom_id>', methods=['GET'])
def get_messages(chatroom_id):
    messages = Chatroom.get_messages(ObjectId(chatroom_id))
    return jsonify

