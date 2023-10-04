import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/Reducers/categoryReducer";
import { add_product, messageClear } from "../../store/Reducers/productReducer";
import { overrideStyle } from "../../utils/utils";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";

const AddProducts = () => {
  const { BsImage, IoCloseSharp } = icons;
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.category);
  const { successMessage, errorMessage, loader } = useSelector(
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

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
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

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  useEffect(() => {
    setAllCategory(categorys);
  }, [categorys]);

  const add_p = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("discount", state.discount);
    formData.append("price", state.price);
    formData.append("category", category);
    formData.append("brand", state.brand);
    formData.append("quantity", state.quantity);
    formData.append("shopName", "cellphoneS");
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(add_product(formData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        quantity: "",
      });
      setImageShow([])
      setImages([])
      setCategory("")
    }
  }, [successMessage, errorMessage]);

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
          <form onSubmit={add_p}>
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
                  value={state.brand}
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
                    {allCategory.map((c, i) => (
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
                  min="0"
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
                rows={7}
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
              {imageShow.map((img, i) => (
                <div className="h-[180px] relative">
                  <label htmlFor={i}>
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full rounded-sm"
                    />
                  </label>
                  <input
                    type="file"
                    id={i}
                    className="hidden"
                    onChange={(e) => changeImage(e.target.files[0], i)}
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoCloseSharp />
                  </span>
                </div>
              ))}
              <label
                htmlFor="image"
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white"
              >
                <span>
                  <BsImage />
                </span>
                <span>Chọn ảnh</span>
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                multiple
                onChange={imageHandle}
              />
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
                  "Thêm sản phẩm"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
