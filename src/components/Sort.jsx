function Sort({ sort, setSort, options }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 top-24">
      
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Urutkan Produk
      </h3>

      <div className="relative">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10
                     text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom arrow */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </span>
      </div>

    </div>
  );
}

export default Sort;
