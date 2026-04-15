import mongoose from "mongoose";

// db schema

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  album: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  genre: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

export const Song = mongoose.model("Song", songSchema);
