const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");

// Initialize express app
const app = express();

// Apply middleware
app.use(cors()); // Enables CORS
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads

// MongoDB connection
const MONGO_URI = process.env.MONGO_URL || "";

let db;
MongoClient.connect(MONGO_URI).then((client) => {
  db = client.db("milestone"); // Now db can be used to write direct MongoDB queries
  console.log("MongoDB connected successfully");
});

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend Application!");
});

// const response = await axios.get(`${backendURL}/user/${walletAddress}`);
app.get("/user/:walletAddress", async (req, res) => {
  console.log("GET /user/:walletAddress");
  try {
    const { walletAddress } = req.params;
    const user = await db.collection("users").findOne({ walletAddress });

    // if user not found then create a new user profile with the wallet address
    if (!user) {
      await db
        .collection("users")
        .insertOne({
          walletAddress: walletAddress,
          carbonCredits: 0,
          greenCredits: 0,
          assets: [],
          investments: [],
          technologies: [],
        });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// get a document from the "token" collection mathcing tokenName MILE
app.get("/token/:tokenName", async (req, res) => {
  console.log("GET /token/:tokenName");
  try {
    const { tokenName } = req.params;
    const token = await db.collection("tokens").findOne({ token: tokenName });

    res.status(200).json({ token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// endpoint to update the token name
app.put("/token/:currentSupply", async (req, res) => {
  console.log("PUT /token/:currentSupply");
  try {
    const { currentSupply } = req.params;
    const token = await db.collection("tokens").findOne({ token: "MILE" });

    if (!token) {
      res.status(404).json({ message: "Token not found" });
      return;
    }

    const updatedToken = await db.collection("tokens").findOneAndUpdate(
      { token: "MILE" },
      {
        $set: {
          currentSupply: currentSupply,
        },
      },
      { returnOriginal: true }
    );

    res.status(200).json({ token: updatedToken });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Listen on a port
const PORT = process.env.PORT || 3070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
