import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";
import Pagiantion from "../Pagiantion";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  categoryAdd,
  messageClear,
  get_category
} from "../../store/Reducers/categoryReducer";
import toast from "react-hot-toast";
import Search from "../components/Search";

const Categories = () => {
  const { FaEdit, FaTrash, FaEye, BsImages, GrClose } = icons;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, categorys } = useSelector(
    (state) => state.category
  );
  const [imageShow, setImageShow] = useState("");

  const [state, setState] = useState({
    name: "",
    image: "",
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const add_category = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
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
        image: "",
      });
      setImageShow("");
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex justify-between items-center lg:hidden mb-5 p-4 bg-[#283046] rounded-md">
        <h1 className="text-white font-semibold text-lg">Danh mục</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Thêm
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#283046] rounded-md">
            <Search
              setParPage={setParPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-white">
                <thead className="text-sm text-white uppercase border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4" scope="col">
                      STT
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Hình ảnh
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Danh mục
                    </th>
                    <th className="py-3 px-4" scope="col">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal">
                  {categorys.map((d, i) => (
                    <tr key={i}>
                      <td
                        className="py-3 px-4 font-medium whitespace-nowrap"
                        scope="row"
                      >
                        {i+1}
                      </td>
                      <td
                        className="py-3 px-4 font-medium whitespace-nowrap"
                        scope="row"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={d.image}
                          alt=""
                        />
                      </td>
                      <td
                        className="py-3 px-4 font-medium whitespace-nowrap"
                        scope="row"
                      >
                        <span>{d.name}</span>
                      </td>
                      <td
                        className="py-3 px-4 font-medium whitespace-nowrap"
                        scope="row"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-[5px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                            <FaEdit size={18} />
                          </Link>
                          <Link className="p-[5px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash size={18} />
                          </Link>
                          <Link className="p-[5px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                            <FaEye size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagiantion
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={3}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[9999] z-20 top-0 transition-all duration-500`}
        >
          <div className="w-full p-5">
            <div className="bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-white">
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-xl text-white font-semibold mb-4 w-full text-center">
                  Thêm danh mục
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className="block lg:hidden cursor-pointer"
                >
                  <GrClose className="text-white" size={20} />
                </div>
              </div>
              <form onSubmit={add_category}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Nhập tên danh mục</label>
                  <input
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    value={state.name}
                    type="text"
                    id="name"
                    name="category_name"
                    required
                    placeholder="Ví dụ: Tai nghe, quần áo..."
                    className="px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="flex justify-center items-center flex-col h-[283px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-white"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} alt="" />
                    ) : (
                      <>
                        <span>
                          <BsImages />
                        </span>
                        <span>Chọn ảnh</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  onChange={imageHandle}
                  type="file"
                  name="image"
                  id="image"
                  required
                  className="hidden"
                />
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={loader ? true : false}
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#fff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      "Thêm danh mục"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
