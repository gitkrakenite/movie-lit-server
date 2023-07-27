const Movie = require("../models/moviesModel");
const User = require("../models/userModel");

// create a scene
const createScene = async (req, res) => {
  const {
    title,
    iframeLink,
    description,
    category,
    trailer,
    movieLink,
    creator,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !iframeLink ||
    !creator ||
    !movieLink ||
    !trailer
  ) {
    return res.status(404).send("Details missing");
  }

  try {
    const scene = await Movie.create({
      title,
      iframeLink,
      description,
      category,
      trailer,
      movieLink,
      creator,
    });
    if (scene) {
      return res.status(201).send(scene);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

const fetchScenes = async (req, res, next) => {
  try {
    const scene = await Movie.find().sort({ $natural: -1 });
    res.status(200).send(scene);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteMovies = async (req, res, next) => {
  // check if movie exist

  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(400).json({ message: "movie not found" });
    return;
  }

  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete movie" });
  }
};

const fetchMovieBasedOnSth = async (req, res) => {
  const { category } = req.body;
  try {
    const scene = await Movie.find({
      category,
    }).sort({ $natural: -1 });
    res.status(200).json(scene);
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentOnScene = async (req, res) => {
  try {
    const { username, comment } = req.body;

    // Find the review by ID
    const scene = await Movie.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the review doesn't exist, return an error
    if (!scene) {
      return res.status(404).json({ error: "Scene not found" });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Create a new comment
    const newComment = {
      username,
      comment,
    };

    // Add the comment to the scene's comments array
    scene.comments.push(newComment);

    // Save the updated scene with the new comment
    await scene.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed To Coment" });
  }
};

const fetchSpecificScene = async (req, res) => {
  try {
    const scene = await Movie.findOne({ _id: req.params.id });
    res.status(200).send(scene);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

// API that checks if review exists
const checkIfMovieAlreadyExists = async (req, res) => {
  const { title } = req.body;

  try {
    const sceneExists = await Movie.findOne({ title });
    if (sceneExists) {
      let exists = "exists";
      return res.status(200).send(exists);
    } else {
      let exists = "not exist";
      return res.status(200).send(exists);
    }
  } catch (error) {
    return res.status(400).send("Error Checking");
  }
};

module.exports = {
  createScene,
  fetchScenes,
  fetchMovieBasedOnSth,
  commentOnScene,
  deleteMovies,
  fetchSpecificScene,
  checkIfMovieAlreadyExists,
};
