const { Thought, User } = require("../models");
const { db } = require("../models/User");

module.exports = {
  getThought(req, res) {
    Thought.find({})
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
      })
      .catch((err) => res.json(err));
  },

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        console.log(thought);
        return !thought
          ? res.status(404).json({ message: "No Thought found with this ID!" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res.status(404).json({ message: "No Reaction foun!" });
        }
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(res.json({ message: "Deleted Thought!" }))
      .catch((err) => res.json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          res.json(dbThoughtData);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};
