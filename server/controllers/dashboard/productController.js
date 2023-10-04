const formidable = require("formidable");
const productModel = require("../../models/productModel");
const cloudinary = require("cloudinary").v2;
const { responseReturn } = require("../../utils/response");

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
        await productModel.create({
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
        responseReturn(res, 201, { message: "Thêm sản phẩm thành công!" });
      } catch (error) {
        responseReturn(res, 500, { error: "Internal server error" });
      }
    });
  };

  get_products = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  get_product = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };

  update_product = async (req, res) => {
    console.log(req.body)
  };
}

module.exports = new productController();
