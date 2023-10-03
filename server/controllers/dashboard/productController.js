const formidable = require("formidable");
const productModel = require("../../models/productModel");
const cloudinary = require("cloudinary").v2;

class productController {
  add_product = async (req, res) => {
    const { id } = req; // Nhận id từ authMiddleware
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        discount,
        price,
        brand,
        quantity,
        shopName,
      } = field;
      const { images } = files;

      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        let allImageUrl = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",
          });
          allImageUrl = [...allImageUrl, result.url];
        }
        const product = await productModel.create({
          sellerId: id,
          name,
          slug,
          category: category.trim(),
          description: description.trim(),
          brand: brand.trim(),
          quantity: parseInt(quantity),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          shopName,
        });
        console.log(product)
      } catch (error) {
        console.log(error)
      }
    });
  };
}

module.exports = new productController();
