const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { registerUser, loginUser, logoutUser } = require("./user");
const { listTodosForUser, createTodoForUser, updateTodoItem, deleteTodoItem } = require("./todo");
const { MongoClient, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const url = process.env.DB_STRING;

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    await client.connect();
    console.log("Connected to MongoDB");
}

async function disconnectFromDatabase() {
    await client.close();
    console.log("Connection to MongoDB closed");
}

app.get("/", (req, res) => {
    res.send({
        message: "Hello Developers!",
        secret: process.env.NOT_SO_SECRET,
    });
});

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        await connectToDatabase();
        const userId = await registerUser(username, password);
        res.send({
            message: "User registered successfully!",
            userId,
        });
    } catch (err) {
        res.status(400).send({
            message: "Error registering user!",
            error: err.message,
        });
    } finally {
        await disconnectFromDatabase();
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        await connectToDatabase();
        const token = await loginUser(username, password);
        res.send({
            message: "User logged in successfully!",
            token,
        });
    } catch (err) {
        res.status(400).send({
            message: "Error logging in user!",
            error: err.message,
        });
    } finally {
        await disconnectFromDatabase();
    }
});

app.post("/logout", async (req, res) => {
    try {
        const { token } = req.body;
        await connectToDatabase();
        await logoutUser(token);
        res.send({
            message: "User logged out successfully!",
        });
    } catch (err) {
        res.status(400).send({
            message: "Error logging out user!",
            error: err.message,
        });
    } finally {
        await disconnectFromDatabase();
    }
});

app.get("/todos", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        await connectToDatabase();
        const todos = await listTodosForUser(token);
        res.send({
            message: "Todos retrieved successfully!",
            todos,
        });
    } catch (err) {
        res.status(400).send({
            message: "Error retrieving todos!",
            error: err.message,
        });
    } finally {
        await disconnectFromDatabase();
    }
});

app.post("/todos", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { title, name } = req.body;
        await connectToDatabase();
        const todo = await createTodoForUser(token, title, name);
        res.send({
            message: "Todo created successfully!",
            todo,
        });
    } catch (err) {
        res.status(400).send({
            message: "Error creating todo!",
            error: err.message,
        });
    } finally {
        await disconnectFromDatabase();
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { id } = req.params;
        const { name, title, completed } = req.body;
        await connectToDatabase();
        const todo = await updateTodoItem(token, new ObjectId(id), name, title, completed);
        res.send({
            message: "Todo updated successfully!",
            todo,
        });
    } catch (err) {
        res.status(400).send({
            message: "Error updating todo!",
            error: err.message,
        });
    } finally {
        await disconnectFromDatabase();
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const { id } = req.params;
        await connectToDatabase();
        await deleteTodoItem(token, new ObjectId(id));
        res.send({
            message: "Todo deleted successfully!",
        });
    } catch (err) {
        res.status(400).send({
            message: "Error deleting todo!",
            error: err.message,
        });
    } finally {
        await disconnectFromDatabase();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
