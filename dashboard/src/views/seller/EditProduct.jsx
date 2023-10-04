import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get_category } from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  get_product,
  messageClear,
  update_product,
  product_image_update,
} from "../../store/Reducers/productReducer";
import { overrideStyle } from "../../utils/utils";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { categorys } = useSelector((state) => state.category);
  const { product, successMessage, errorMessage, loader } = useSelector(
    (state) => state.product
  );

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    quantity: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId]);

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState(categorys);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categorys);
    }
  };

  const [imageShow, setImageShow] = useState([]);

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_image_update({
          oldImage: img,
          newImage: files[0],
          productId,
        })
      );
    }
  };

  useEffect(() => {
    setState({
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: product.price,
      brand: product.brand,
      quantity: product.quantity,
    });
    setCategory(product.category);
    setImageShow(product.images);
  }, [product]);

  useEffect(() => {
    if (categorys.length > 0) {
      setAllCategory(categorys);
    }
  }, [categorys]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const update_p = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      quantity: state.quantity,
      productId: productId,
    };
    dispatch(update_product(obj));
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-white text-xl font-semibold">Thêm Sản Phẩm</h1>
          <Link
            className="bg-red-500 hover:shadow-red-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to="/seller/dashboard/products"
          >
            Sản Phẩm
          </Link>
        </div>
        <div>
          <form onSubmit={update_p}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Tên sản phẩm</label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nhập tên sản phẩm..."
                  className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Thương hiệu</label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Nhập tên thương hiệu..."
                  className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 text-white">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Danh mục sản phẩm</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  id="category"
                  placeholder="--Chọn danh mục--"
                  className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      type="text"
                      placeholder="Tìm kiếm tên danh mục  ..."
                      className="w-full px-3 py-1 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {allCategory.length > 0 &&
                      allCategory.map((c, i) => (
                        <span
                          className="px-4 py-2 hover:bg-red-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${category === c.name && 'bg-indigo-500"
                          onClick={() => {
                            setCateShow(false);
                            setCategory(c.name);
                            setSearchValue("");
                            setAllCategory(categorys);
                          }}
                        >
                          {c.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="quantity">Số lượng</label>
                <input
                  onChange={inputHandle}
                  value={state.quantity}
                  type="number"
                  min="0"
                  name="quantity"
                  id="quantity"
                  placeholder="Nhập số lượng sản phẩm..."
                  className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Giá sản phẩm</label>
                <input
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Nhập giá sản phẩm..."
                  className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Giảm giá</label>
                <input
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="% Giảm giá..."
                  className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-white mb-5">
              <label htmlFor="brand">Mô tả sản phẩm</label>
              <textarea
                rows={4}
                onChange={inputHandle}
                value={state.description}
                type="text"
                name="description"
                id="description"
                placeholder="Mô tả sản phẩm..."
                className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
              ></textarea>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-white mb-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div>
                    <label htmlFor={i} className="h-[180px]">
                      <img src={img} alt="" className="h-full" />
                    </label>
                    <input
                      type="file"
                      id={i}
                      className="hidden"
                      onChange={(e) => changeImage(img, e.target.files)}
                    />
                  </div>
                ))}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loader ? true : false}
                className="group relative w-[200px] h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Cập nhật sản phẩm"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
