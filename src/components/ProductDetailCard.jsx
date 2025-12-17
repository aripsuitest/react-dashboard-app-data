import { Link } from "react-router-dom";

function ProductDetailCard({ product }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Tombol kembali */}
      <Link to="/" className="text-blue-500 hover:underline">
        ← Kembali ke produk
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gambar produk */}
        <div className="border rounded-lg overflow-hidden shadow">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Info produk */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-xl text-green-600 font-semibold mb-2">
            Rp {product.price}
          </p>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Category: {product.category}
          </p>

          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailCard;
