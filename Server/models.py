# models.py
from flask_pymongo import pymongo

db = pymongo.MongoClient('mongodb+srv://bhmcconn:12345@ms3db.r3lncfq.mongodb.net/')['chatRoom']

class User:
    @staticmethod
    def create(username, password):
        return db.users.insert_one({'username': username, 'password': password}).inserted_id

    @staticmethod
    def find(username):
        return db.users.find_one({'username': username})

class Chatroom:
    @staticmethod
    def create(title):
        return db.chatrooms.insert_one({'title': title}).inserted_id

    @staticmethod
    def get_all():
        return db.chatrooms.find()

    @staticmethod
    def get_by_id(chatroom_id):
        return db.chatrooms.find_one({'_id': chatroom_id})

    @staticmethod
    def add_message(chatroom_id, username, message):
        return db.messages.insert_one({'chatroom_id': chatroom_id, 'username': username, 'message': message}).inserted_id

    @staticmethod
    def get_messages(chatroom_id):
        return db.messages.find({'chatroom_id': chatroom_id})
