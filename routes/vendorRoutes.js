//Importing the Vendor Controller
// Importing the vendorController module which contains logic for handling vendor-related requests
const vendorController = require("../contollers/vendorController");
// Importing the Express framework to create routes and handle HTTP requests
const express = require("express");
// It is a inbuilt method present in the express
const router = express.Router();

// /register is the end point
// Here we are taking data and sending it to the database so we use post method
// Defining a POST route for the "/register" endpoint
// When a POST request is made to /register, the vendorRegister function in vendorController will be called
router.post("/register", vendorController.vendorRegister);
router.post("/login", vendorController.vendorLogin);
router.get("/all-vendors", vendorController.getAllVendors);
router.get("/single-vendor/:monday", vendorController.getVendorById);
module.exports = router;
