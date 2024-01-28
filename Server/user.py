import bcrypt
import crypto
from pymongo import MongoClient
import os

dotenv.load_dotenv()

DB_STRING = os.environ.get("DB_STRING")
print("DB_STRING:", DB_STRING)

class StableClient:
    instance = None

    def __new__(cls):
        if cls.instance is None:
            cls.instance = super(StableClient, cls).__new__(cls)
            cls.instance._client = cls.instance.create_db_client()
        return cls.instance

    def create_db_client(self):
        client = MongoClient(DB_STRING)
        return client

    def is_connected(self):
        return self._client is not None and self._client.server_info() is not None

    def connect(self):
        print("call to connect")
        if not self.is_connected():
            print("not connected, connecting")
            if not self._client:
                print("no client, creating client")
                self._client = self.create_db_client()

    async def insert_user(self, username, hashed_password):
        self.connect()
        collection = self._client.get_database().get_collection("User")
        result = collection.insert_one({"username": username, "password": hashed_password})
        return result.inserted_id

    async def find_user_by_username(self, username):
        self.connect()
        collection = self._client.get_database().get_collection("User")
        return collection.find_one({"username": username})

    async def update_user_token(self, user_id, token):
        self.connect()
        collection = self._client.get_database().get_collection("User")
        collection.update_one({"_id": user_id}, {"$set": {"token": token}})

    async def remove_user_token(self, token):
        self.connect()
        collection = self._client.get_database().get_collection("User")
        collection.update_one({"token": token}, {"$set": {"token": None}})

    async def end(self):
        print("call to end connection")
        if self.is_connected():
            print("connected, ending connection")
            self._client.close()
            self._client = None

client = StableClient()

def register_user(username, password):
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    user_id = client.insert_user(username, hashed_password)
    return user_id

def login_user(username, password):
    user = client.find_user_by_username(username)

    if not user:
        raise Exception("User not found")

    is_match = bcrypt.checkpw(password.encode("utf-8"), user["password"])
    if not is_match:
        raise Exception("Invalid password")

    token = crypto.random_bytes(64).hex()
    client.update_user_token(user["_id"], token)

    return token

def logout_user(token):
    client.remove_user_token(token)
