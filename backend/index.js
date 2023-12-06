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

// an api endpoint to iterate through all the users documents and then check for the user whose role is "user" and then iterate through the reviews array of objects and find all the object in which the restaurantId matches the restaurantId passed in the params
app.get("/reviews/:restaurantId", async (req, res) => {
  console.log("GET /reviews/:restaurantId");
  try {
    const { restaurantId } = req.params;
    const users = await db.collection("users").find().toArray();
    const reviews = [];
    users.forEach((user) => {
      if (user.type === "User") {
        if (user.reviews) {
          user.reviews.forEach((review) => {
            if (review.restaurantId === restaurantId) {
              reviews.push(review);
            }
          });
        } else return;
      }
    });

    res.status(200).json({ reviews });
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
    const restaurants = [];
    users.forEach((user) => {
      restaurants.push(...user.restaurants);
    });

    res.status(200).json({ restaurants });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// get a document from the "token" collection mathcing tokenName mile
app.get("/token/:tokenName", async (req, res) => {
  console.log("GET /token/:tokenName");
  console.log("req.params", req.params);
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
    const token = await db.collection("tokens").findOne({ token: "mile" });

    if (!token) {
      res.status(404).json({ message: "Token not found" });
      return;
    }

    const updatedToken = await db.collection("tokens").findOneAndUpdate(
      { token: "mile" },
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
