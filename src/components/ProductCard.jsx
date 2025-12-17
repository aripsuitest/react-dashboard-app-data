import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="group relative rounded-2xl bg-white/80 backdrop-blur border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-top from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h2 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
            {product.title}
          </h2>

          <div className="flex items-center justify-between">
            <p className="text-lg font-bold bg-gradient-to-right from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              ${product.price}
            </p>

            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              Detail
            </span>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-blue-400/40 transition" />

      </div>
    </Link>
  );
}

export default ProductCard;
