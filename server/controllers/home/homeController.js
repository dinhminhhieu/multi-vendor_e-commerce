const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");
const { responseReturn } = require("../../utils/response");

class homeController {
  //1. Chia danh sách sản phẩm thành các nhóm, mỗi nhóm có tối đa 3 sản phẩm
  formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  // 2. Lấy danh mục sản phẩm
  get_category = async (req, res) => {
    try {
      const categorys = await categoryModel.find({});
      responseReturn(res, 200, { categorys });
    } catch (error) {
      console.log(error.message);
    }
  };

  // 3. Lấy sản phẩm
  get_products = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .limit(20)
        .sort({ createAt: -1 });

      const allProduct1 = await productModel.find({}).limit(9).sort({
        createdAt: -1,
      });
      const latest_product = this.formateProduct(allProduct1);

      const allProduct2 = await productModel.find({}).limit(9).sort({
        rating: -1,
      });

      const topRating_product = this.formateProduct(allProduct2);
      const allProduct3 = await productModel.find({}).limit(9).sort({
        discount: -1,
      });

      const discount_product = this.formateProduct(allProduct3);

      responseReturn(res, 200, {
        products,
        latest_product,
        topRating_product,
        discount_product,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

}
module.exports = new homeController();
