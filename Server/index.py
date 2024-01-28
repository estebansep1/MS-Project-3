from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
import crypto

app = Flask(__name__)
CORS(app)

port = int(os.environ.get("PORT", 5000))
db_string = os.environ.get("DB_STRING")

client = MongoClient(db_string, connect=False)

def connect_to_database():
    client.server_info()

def disconnect_from_database():
    client.close()

@app.route("/")
def hello():
    return jsonify({"message": "Hello Developers!", "secret": os.environ.get("NOT_SO_SECRET")})

@app.route("/register", methods=["POST"])
def register_user():
    try:
        data = request.json
        username, password = data["username"], data["password"]
        connect_to_database()
        user_id = insert_user(username, password)
        return jsonify({"message": "User registered successfully!", "userId": str(user_id)})
    except Exception as err:
        return jsonify({"message": "Error registering user!", "error": str(err)}), 400
    finally:
        disconnect_from_database()

@app.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.json
        username, password = data["username"], data["password"]
        connect_to_database()
        token = login_user(username, password)
        return jsonify({"message": "User logged in successfully!", "token": token})
    except Exception as err:
        return jsonify({"message": "Error logging in user!", "error": str(err)}), 400
    finally:
        disconnect_from_database()

@app.route("/logout", methods=["POST"])
def logout_user():
    try:
        data = request.json
        token = data["token"]
        connect_to_database()
        logout_user(token)
        return jsonify({"message": "User logged out successfully!"})
    except Exception as err:
        return jsonify({"message": "Error logging out user!", "error": str(err)}), 400
    finally:
        disconnect_from_database()

@app.route("/todos", methods=["GET", "POST"])
def handle_todos():
    try:
        token = request.headers.get("Authorization").split(" ")[1]
        connect_to_database()

        if request.method == "GET":
            todos = list_todos_for_user(token)
            return jsonify({"message": "Todos retrieved successfully!", "todos": todos})
        elif request.method == "POST":
            data = request.json
            title, name = data["title"], data["name"]
            todo = create_todo_for_user(token, title, name)
            return jsonify({"message": "Todo created successfully!", "todo": todo})

    except Exception as err:
        return jsonify({"message": f"Error handling todos! {str(err)}"}), 400
    finally:
        disconnect_from_database()

@app.route("/todos/<string:todo_id>", methods=["PUT", "DELETE"])
def handle_todo_by_id(todo_id):
    try:
        token = request.headers.get("Authorization").split(" ")[1]
        connect_to_database()
        todo_id_obj = ObjectId(todo_id)

        if request.method == "PUT":
            data = request.json
            name, title, completed = data["name"], data["title"], data["completed"]
            todo = update_todo_item(token, todo_id_obj, name, title, completed)
            return jsonify({"message": "Todo updated successfully!", "todo": todo})
        elif request.method == "DELETE":
            delete_todo_item(token, todo_id_obj)
            return jsonify({"message": "Todo deleted successfully!"})

    except Exception as err:
        return jsonify({"message": f"Error handling todo by id! {str(err)}"}), 400
    finally:
        disconnect_from_database()

def insert_user(username, password):
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    result = client.users.insert_one({"username": username, "password": hashed_password})
    return result.inserted_id

def login_user(username, password):
    user = client.users.find_one({"username": username})

    if not user:
        raise Exception("User not found")

    is_match = bcrypt.checkpw(password.encode("utf-8"), user["password"])
    if not is_match:
        raise Exception("Invalid password")

    token = crypto.get_random_bytes(64).hex()
    client.users.update_one({"_id": user["_id"]}, {"$set": {"token": token}})
    return token

def logout_user(token):
    client.users.update_one({"token": token}, {"$set": {"token": None}})

def list_todos_for_user(token):
    user = client.users.find_one({"token": token})
    if user:
        todos = list(client.todos.find({"user_id": user["_id"]}))
        return [{"_id": str(todo["_id"]), "name": todo["name"], "title": todo["title"], "completed": todo["completed"]} for todo in todos]
    return []

def create_todo_for_user(token, title, name):
    user = client.users.find_one({"token": token})
    if user:
        result = client.todos.insert_one({"user_id": user["_id"], "title": title, "name": name, "completed": False})
        todo = client.todos.find_one({"_id": result.inserted_id})
        return {"_id": str(todo["_id"]), "name": todo["name"], "title": todo["title"], "completed": todo["completed"]}

def update_todo_item(token, todo_id, name, title, completed):
    user = client.users.find_one({"token": token})
    if user:
        client.todos.update_one({"_id": todo_id, "user_id": user["_id"]}, {"$set": {"name": name, "title": title, "completed": completed}})
        todo = client.todos.find_one({"_id": todo_id})
        return {"_id": str(todo["_id"]), "name": todo["name"], "title": todo["title"], "completed": todo["completed"]}

def delete_todo_item(token, todo_id):
    user = client.users.find_one({"token": token})
    if user:
        client.todos.delete_one({"_id": todo_id, "user_id": user["_id"]})

if __name__ == "__main__":
    app.run(port=port)
