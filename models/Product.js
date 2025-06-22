const mongoose = require("mongoose");
//This Schema mainly describes about the product details
// Which include productName,price,category:veg,nonveg,image,bestSeller fot that particular item,description about that product
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    // We are taking it as string because we give the money the integer format onlty but additionally we will add the ruppee symbol because of that it is given as String
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  image: {
    type: String,
  },
  bestSeller: {
    type: String,
  },
  description: {
    type: String,
  },

  //   Here we will relate this product details to the firm..
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
