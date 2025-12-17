function Pagination({ total, limit, page, setPage }) {
  const totalPage = Math.ceil(total / limit);
  const siblings = 1; // jumlah page di kiri & kanan page aktif

  const pages = [];

  // Page pertama selalu muncul
  pages.push(1);

  // Page sebelum page aktif
  if (page - siblings > 2) {
    pages.push("prev-ellipsis");
  }
  for (let i = Math.max(2, page - siblings); i <= Math.min(page + siblings, totalPage - 1); i++) {
    pages.push(i);
  }

  // Page setelah page aktif
  if (page + siblings < totalPage - 1) {
    pages.push("next-ellipsis");
  }

  // Page terakhir selalu muncul
  if (totalPage > 1) pages.push(totalPage);

  return (
    <div className="justify-center flex gap-2 overflow-x-auto max-w-full p-2 bg-white rounded-lg shadow">
      {pages.map((p, index) => {
        if (p === "prev-ellipsis" || p === "next-ellipsis") {
          return (
            <span key={index} className="px-3 py-2">
              ...
            </span>
          );
        }
        return (
          <button
            key={index}
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 ${
              page === p ? "bg-blue-600 text-white shadow" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
