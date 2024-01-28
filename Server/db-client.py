from pymongo import MongoClient
from pymongo.errors import OperationFailure
import os

class StableClient:
    def __init__(self):
        if StableClient.instance:
            return StableClient.instance

        self._client = self.create_db_client()

        StableClient.instance = self

    def create_db_client(self):
        client = MongoClient(os.environ["DB_STRING"], 
                             useNewUrlParser=True, 
                             useUnifiedTopology=True)

        def error_handler(err):
            print(f"Unexpected error on MongoDB client: {err}")
            # You can add your own logic for handling errors here

        client.on_error = error_handler

        return client

    def is_connected(self):
        return self._client and self._client.is_connected

    async def connect(self):
        # If the client is not connected, then connect
        print("call to connect")
        if not self.is_connected():
            print("not connected, connecting")
            if not self._client:
                print("no client, creating client")
                self._client = self.create_db_client()
            await self._client.connect()

    async def query(self, collection_name, filter):
        await self.connect()  # Ensure connection before querying
        print("runningQuery")
        collection = self._client.get_database().get_collection(collection_name)
        return list(collection.find(filter))

    async def end(self):
        print("call to end connection")
        if self.is_connected():
            print("connected, ending connection")
            await self._client.close()
            self._client = None

# Load environment variables from a .env file
from dotenv import load_dotenv
load_dotenv()

client = StableClient()

# Export the instance
client_instance = client._client

# Example usage
async def example_usage():
    await client.connect()
    result = await client.query("your_collection_name", {"your_field": "your_value"})
    print(result)
    await client.end()

if __name__ == "__main__":
    example_usage()
