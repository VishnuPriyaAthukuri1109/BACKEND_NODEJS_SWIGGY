const mongoose = require("mongoose");
// Creation of the model and the creation of the schema
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // The relation established between the vendor and the firm
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});
// We have to export the model

// In order to store the data in the format of the schema we use the conrollers and routes.
const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
