import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";

const EditProduct = () => {
  const { BsImage, IoCloseSharp } = icons;

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

  const categories = [
    {
      id: 1,
      name: "Thể thao",
    },
    {
      id: 2,
      name: "Áo sơ mi",
    },
    {
      id: 3,
      name: "Điện thoại",
    },
    {
      id: 4,
      name: "Laptop",
    },
    {
      id: 5,
      name: "Đồng hồ",
    },
  ];

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState(categories);
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
      setAllCategory(categories);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const changeImage = (img, files) => {
    if(files.length > 0) {
        console.log(img)
        console.log(files[0])
    }
  };

  useEffect(() => {
    setState({
      name: "Áo nam polo",
      description: "Áo nam polo",
      discount: "10",
      price: "10.000",
      brand: "Mino",
      quantity: "15",
    });
    setCategory("Thể thao")
    setImageShow([
        "http://localhost:3000/images/admin.png",
        "http://localhost:3000/images/admin.png"
    ])
  }, []);

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
          <form>
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
                    {allCategory.map((c, i) => (
                      <span
                        className="px-4 py-2 hover:bg-red-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${category === c.name && 'bg-indigo-500"
                        onClick={() => {
                          setCateShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategory(categories);
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
              {
                imageShow.map((img, i) => <div>
                    <label htmlFor={i}>
                        <img src={img} alt="" />
                    </label>
                    <input type="file" id={i} className="hidden" onChange={(e) => changeImage(img, e.target.files)} />
                </div>)
              }
            </div>
            <div className="flex justify-end">
              <button className="bg-red-500 hover:shadow-red-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2">
                Cập nhật sản phẩm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
