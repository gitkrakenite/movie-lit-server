const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// movies
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    iframeLink: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    trailer: {
      type: String,
      required: true,
    },
    movieLink: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },

    comments: [commentSchema],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movies", movieSchema);
module.exports = Movie;
