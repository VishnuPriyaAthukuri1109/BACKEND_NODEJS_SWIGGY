const express = require("express");
const firmController = require("../contollers/firmController");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/add-firm", verifyToken, firmController.addFirm);
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  req.headersSent("Content-Type", "image/jpg");
  res.sentFile(Path2D.join(__dirname, "..", "uploads", imageName));
});
router.delete("/firmId", firmController.deleteFirmById);
module.exports = router;
