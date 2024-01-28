from pymongo import MongoClient, ASCENDING
from pymongo.errors import OperationFailure
from pymongo.collection import Collection

url = "mongodb://localhost:27017"  # Replace with your MongoDB connection string
db_name = "your_database_name"  # Replace with your database name

client = MongoClient(url, connect=False)

create_user_table_query = [
    {
        "$create": "User",
        "documents": [
            {
                "username": {"$type": "string", "$unique": True, "$required": True},
                "password": {"$type": "string", "$required": True},
                "token": {"$type": "string", "$default": None},
            },
        ],
    },
]

create_todo_table_query = [
    {
        "$create": "Todo",
        "documents": [
            {
                "user_id": {"$type": "integer", "$reference": "User", "$required": True},
                "title": {"$type": "string", "$default": ""},
                "name": {"$type": "string", "$required": True},
                "completed": {"$type": "boolean", "$default": False},
            },
        ],
    },
]

def create_tables():
    try:
        client.server_info()
        db = client[db_name]

        # Create User collection
        create_collection(db, "User", create_user_table_query)

        # Create Todo collection
        create_collection(db, "Todo", create_todo_table_query)

        print('"User" and "Todo" collections created successfully.')
    except OperationFailure as e:
        print("Error creating collections:", e)
    finally:
        client.close()

def create_collection(db, collection_name, queries):
    collection = db[collection_name]
    try:
        collection.create_index("username", unique=True)
    except OperationFailure as e:
        print(f"Error creating index on {collection_name}: {e}")

if __name__ == "__main__":
    create_tables()
