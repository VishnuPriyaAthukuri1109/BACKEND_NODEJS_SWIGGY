// To get the schema of the vendor table like username,email,password
//Importing the Vendor schema/model to interact with the vendor collection
const Vendor = require("../models/Vendor");
// Used to generate JSON Web Tokens (JWTs) for authentication or verification
// This package is mainly used to convert validated email into token and token will be stored in database
const jwt = require("jsonwebtoken");
// bcryptjs is used to hash passwords before storing them for security
// In order to hash the passwords we will be converting the text password to hashed value as it a sensitive information
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.WhatIsYourName;
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    // Checking if the email is present in the database or not
    // If it is present it returns the bad response code 400 with the message email already presents.
    if (vendorEmail) {
      return res.status(400).json("Email already present in the database");
    }
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // In order to store the responses getting from the front end we have created new record and we have assigned the values getting from the frontend
    // Create a new vendor instance with the provided and processed data
    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });
    // We stored the record
    await newVendor.save();
    // The response codes from 201 t0 300 are called as positive response codes
    // After success fully stored in the database
    res.status(201).json({ message: "Vendor registered Successfully" });
    console.log("Registered");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

// After successful login we are going to generate the token
// Token is mainly generated based on the id which is present in the mongo db
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // In order to generate the jwt token it uses the method called as sign and it takes three parameters called by passing which parameter you want to generate the token,secret key,expiresIn(duration after that duration it again creates the new token)
    const token = jwt.sign({ vendorId: vendor._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: "Login Successful", token });
    console.log(email, "This is token", token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};
// To retrive the data of the vendors who are registered
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.monday;
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    const vendorFirmId = vendor.firm[0]._id;
    res.status(200).json({ vendorId, vendorFirmId, vendor });
    console.log(vendorFirmId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// This line will tell us by exporting this it can be used any where in the program by importing it..
module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };
