// ✅ Load dotenv before any other imports
import dotenv from "dotenv";
dotenv.config(); // Load .env file

// ✅ Log values to check if they are loaded
console.log("BACKEND_URL:", process.env.BACKEND_URL || "Not Found");
console.log("MongoDB URL:", process.env.MONGO_URL || "Not Found");

import express from "express";
import { connectDb } from "./database/db.js";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import { Chat } from "./models/ChatModel.js";
import { isAuth } from "./middlewares/isAuth.js";
import { User } from "./models/userModel.js";
import { app, server } from "./socket/socket.js";
import path from "path";
import axios from "axios";

const url = process.env.BACKEND_URL; // ✅ Load from .env
const interval = 30000;

// ✅ Check if URL is undefined before making a request
if (!url) {
  console.error("❌ BACKEND_URL is not defined. Check your .env file.");
} else {
  function reloadWebsite() {
    axios
      .get(url)
      .then((response) => {
        console.log(
          `Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`
        );
      })
      .catch((error) => {
        console.error(`Error reloading at ${new Date().toISOString()}:`, error);
      });
  }

  // Set interval to reload every 30 seconds (optional, only if needed)
  setInterval(reloadWebsite, interval);
}
