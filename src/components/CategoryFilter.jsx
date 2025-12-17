import React from "react";

const CategoryFilter = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="mb-4 flex items-center space-x-4">
      {/* Tombol SEMUA */}
      <button
        className={`
          px-4 py-2 rounded-lg font-medium transition-colors duration-200
          ${selectedCategory === "all" 
            ? "bg-blue-500 text-white shadow-md hover:bg-blue-600" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
        `}
        onClick={() => setSelectedCategory("all")}
      >
        SEMUA
      </button>

      {/* Dropdown kategori */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="
          ml-4 px-3 py-2 border border-gray-300 rounded-lg 
          shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-all duration-200
        "
      >
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
