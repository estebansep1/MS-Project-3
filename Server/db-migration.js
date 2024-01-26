const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const dbName = "your_database_name"; // Replace with your database name

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const createUserTableQuery = [
    {
        $create: "User",
        documents: [
            {
                username: { $type: "string", $unique: true, $required: true },
                password: { $type: "string", $required: true },
                token: { $type: "string", $default: null },
            },
        ],
    },
];

const createTodoTableQuery = [
    {
        $create: "Todo",
        documents: [
            {
                user_id: { $type: "integer", $reference: "User", $required: true },
                title: { $type: "string", $default: "" },
                name: { $type: "string", $required: true },
                completed: { $type: "boolean", $default: false },
            },
        ],
    },
];

async function createTables() {
    try {
        await client.connect();
        const db = client.db(dbName);

        // Create User collection
        await db.createCollection("User");
        await db.collection("User").createIndexes([{ key: { username: 1 }, unique: true }]);

        // Create Todo collection
        await db.createCollection("Todo");
        await db.collection("Todo").createIndexes([{ key: { user_id: 1 } }]);

        console.log('"User" and "Todo" collections created successfully.');
    } catch (err) {
        console.error("Error creating collections:", err);
    } finally {
        await client.close();
    }
}

createTables();
