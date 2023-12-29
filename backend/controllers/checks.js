const router = require("express").Router();

router.get("/version", (req, res) => {
  res.send("1.0.1");
});

router.get("/health", (req, res) => {
  res.send("ok");
});

module.exports = router;