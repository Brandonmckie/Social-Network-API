const router = require("express").Router();

const {
  getThought,
  createThought,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtControllers");

router.route("/").get(getThought).post(createThought);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .post(addReaction)
  .delete(removeThought);

router.route("/:thoughtId/:reactionId").delete(removeReaction);

module.exports = router;
