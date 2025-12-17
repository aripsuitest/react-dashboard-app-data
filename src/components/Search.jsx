import { useState } from "react";

function SearchProduct({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <div className="w-full mb-6">
      <div className="relative max-w-md">
        
        {/* Icon */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>

        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="Cari produk..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200
                     bg-white shadow-sm text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition"
        />
      </div>
    </div>
  );
}

export default SearchProduct;
