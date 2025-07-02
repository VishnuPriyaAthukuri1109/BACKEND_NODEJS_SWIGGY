const mongoose = require("mongoose");

const firmSchema = new mongoose.Schema({
  // Firm Name indicates that the restaruent name
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: {
    // Category will have the multiple values like veg and non veg so we are declaring the array
    type: [
      {
        type: String,
        // Enum will take the multiple values
        enum: ["veg", "non-veg"],
      },
    ],
  },
  region: {
    type: [
      {
        type: String,
        enum: ["south-indian", "north-indian", "chinese", "bakery"],
      },
    ],
  },
  offer: {
    type: String,
  },

  image: {
    type: String,
  },
  //   To establish the relation between the two models we are using the standard defination of the mongoose
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // This firm table is referenced with the vendor table
      ref: "Vendor",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
const Firm = mongoose.model("Firm", firmSchema);
module.exports = Firm;
