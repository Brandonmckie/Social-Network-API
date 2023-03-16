const router = require("express").Router();
const {
  getUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userControllers");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
