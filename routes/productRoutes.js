const express = require("express");
const productController = require("../contollers/productController");
const router = express.Router();
router.post("/add-product/:firmId", productController.addProduct);
router.get("/:firmId/products", productController.getProductByFirm);
// To retrieve the images
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  req.headersSent("Content-Type", "image/jpg");
  res.sentFile(Path2D.join(__dirname, "..", "uploads", imageName));
});
router.delete("/:productId", productController.deleteProductById);
module.exports = router;
