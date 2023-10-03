import React from "react";

const Search = ({ setParPage, searchValue, setSearchValue }) => {
  return (
    <div className="flex justify-between items-center">
      <select
        name=""
        id=""
        className="py-2 px-4 hover:border-indigo-500 outline-none bg-[#283046] border border-slate-400 rounded-md text-white"
        onChange={(e) => setParPage(parseInt(e.target.value))}
      >
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
      <input
        type="text"
        id="name"
        placeholder="Tìm kiếm theo trường..."
        className="w-[250px] px-4 py-2 outline-none border bg-transparent border-slate-400 rounded-md text-white focus:border-indigo-500 overflow-hidden"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
