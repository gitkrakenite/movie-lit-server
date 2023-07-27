const express = require("express");
const {
  createScene,
  fetchScenes,
  deleteMovies,
  fetchSpecificScene,
  commentOnScene,
} = require("../controllers/movieController");
const router = express.Router();

router.post("/", createScene); //create scene
router.get("/", fetchScenes); //get all scene
router.delete("/:id", deleteMovies); //delete a scene
router.get("/:id", fetchSpecificScene); // specific scene
router.post("/comment/:id", commentOnScene); // comment scene

module.exports = router;
