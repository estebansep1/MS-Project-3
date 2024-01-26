const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
console.log("DB_STRING:", process.env.DB_STRING);

class StableClient {
    constructor() {
        if (StableClient.instance) {
            return StableClient.instance;
        }

        this._client = this.createDbClient();

        StableClient.instance = this;
    }

    createDbClient() {
        const client = new MongoClient(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        client.on("error", async (err) => {
            console.error("Unexpected error on MongoDB client:", err);
            // You can add your own logic for handling errors here
        });

        return client;
    }

    isConnected() {
        return this._client && this._client.isConnected();
    }

    async connect() {
        // If the client is not connected, then connect
        console.log("call to connect");
        if (!this.isConnected()) {
            console.log("not connected, connecting");
            if (!this._client) {
                console.log("no client, creating client");
                this._client = this.createDbClient();
            }
            await this._client.connect();
        }
    }

    async insertUser(username, hashedPassword) {
        await this.connect();
        const collection = this._client.db().collection("User");
        const result = await collection.insertOne({ username, password: hashedPassword });
        return result.insertedId;
    }

    async findUserByUsername(username) {
        await this.connect();
        const collection = this._client.db().collection("User");
        return collection.findOne({ username });
    }

    async updateUserToken(userId, token) {
        await this.connect();
        const collection = this._client.db().collection("User");
        await collection.updateOne({ _id: userId }, { $set: { token } });
    }

    async removeUserToken(token) {
        await this.connect();
        const collection = this._client.db().collection("User");
        await collection.updateOne({ token }, { $set: { token: null } });
    }

    async end() {
        console.log("call to end connection");
        if (this.isConnected()) {
            console.log("connected, ending connection");
