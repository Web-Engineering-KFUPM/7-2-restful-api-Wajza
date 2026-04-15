import express from "express";
import cors from "cors";

// import dotenv and load environment variables from .env
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import { Song } from "./models/song.model.js";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());              
app.use(express.json());

await connectDB(process.env.MONGO_URL);
// api/songs (Read all songs)
app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: songs.length,
      data: songs
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch songs",
      error: error.message
    });
  }
});
// api/songs (Insert song)
app.post("/api/songs", async (req, res) => {
  try {
    const { title, artist, album, year, genre, duration } = req.body;
    
  
    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        message: "Title and artist are required fields"
      });
    }
    
    const newSong = await Song.create({
      title,
      artist,
      album,
      year,
      genre,
      duration
    });
    
    res.status(201).json({
      success: true,
      message: "Song created successfully",
      data: newSong
    });
  } catch (error) {
    console.error("Error creating song:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create song",
      error: error.message
    });
  }
});