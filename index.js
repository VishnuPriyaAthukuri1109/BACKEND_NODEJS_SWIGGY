const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// body-parser is used to convert the input data into the json format
const bodyParser = require("body-parser");
// for creating the http request
// To create http request we will use the middle ware
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4000;

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("MongoDB Database Connected Successfully To my project")
  )
  .catch((error) => console.log("MongoDB connection error:", error));
// middle wares
app.use(bodyParser.json());
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));
// Route setup
app.use("/", (req, res) => {
  res.send("<h1> Welcome to Vishnu Restaurant</h1>");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server started and running at port ${PORT}`);
});
