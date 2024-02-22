const Product = require("../models/product");

module.exports.addProduct = async (req, res) => {
  const { name, image, category, new_price, old_price } = req.body;

  const products = await Product.find({});
  let id;

  if (products.length > 0) {
    const last_product_array = products.splice(-1);
    const last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = await Product.create({
    id: id,
    name,
    image,
    category,
    new_price,
    old_price,
  });

  //   console.log(product);

  return res.status(200).json({ msg: "Product added successfully", product });
};

module.exports.removeProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  //   console.log(product);
  return res.json({ msg: "Product removed successfully", product });
};

module.exports.getAllProducts = async (req, res) => {
  const product = await Product.find({});

  res.status(200).json({ msg: "Get All Products", product });
};
