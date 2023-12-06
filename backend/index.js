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
  console.log("Hello");
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
      await db.collection("users").insertOne({
        walletAddress: walletAddress,
      });

      res
        .status(200)
        .json({ user: { walletAddress: walletAddress }, alreadyExists: false });
      return;
    }

    res.status(200).json({ user: user, alreadyExists: true });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// api endpoint to get a users profile data based on the walletAddress
app.get("/profile/:walletAddress", async (req, res) => {
  console.log("GET /profile/:walletAddress");
  try {
    const { walletAddress } = req.params;
    const user = await db.collection("users").findOne({ walletAddress });

    // if user not found then create a new user profile with the wallet address
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user: user });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// api endpoint to update a users profile data based on the walletAddress
app.put("/profile/:walletAddress", async (req, res) => {
  console.log("PUT /profile/:walletAddress");
  try {
    console.log(req.params);
    console.log(req.body);
    const { walletAddress } = req.params;

    const user = await db.collection("users").findOne({ walletAddress });

    // if user not found then create a new user profile with the wallet address
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await db.collection("users").findOneAndUpdate(
      { walletAddress },
      {
        $set: {
          ...req.body,
        },
      },
      { returnOriginal: true }
    );

    res.status(200).json({ user: updatedUser });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// api endpoint to get all the list of restaurantd from all the users. each user profile will have an array called restaurants
app.get("/restaurants", async (req, res) => {
  console.log("GET /restaurants");
  try {
    // iterate over each user document and get the restaurants array
    const users = await db.collection("users").find().toArray();
    console.log(users);
    const restaurants = [];
    users.forEach((user) => {
      if (user.type == "Owner") {
        restaurants.push(...user);
      }
    });

    res.status(200).json({ restaurants });
    return;
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
