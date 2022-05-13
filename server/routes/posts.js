const router = require("express").Router();
// To make this route private, just simply write :
const verifyToken = require("./verifyToken");

router.get("/", verifyToken, (req, res) => {
  res.json({
    posts: {
      title: "My first private post",
      description: "This is my first post",
    },
  });
});
module.exports = router;
