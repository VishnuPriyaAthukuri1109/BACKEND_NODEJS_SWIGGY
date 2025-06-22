const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.WhatIsYourName;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  // We are creating the promise
  try {
    // verify method takes 2 parameters token and secrete key
    const decoded = jwt.verify(token, secretKey);
    const vendor = await Vendor.findById(decoded.vendorId);
    // While decoding if we get any error
    if (!vendor) {
      return res.status(404).json({ error: "Vednor not found" });
    }
    req.vendorId = vendor._id;
    // If this entire code is correct then it will allow for the next function to be executed
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
