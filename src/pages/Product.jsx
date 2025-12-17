import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts, searchProducts, getAllCategories, getProductsByCategory} from "../api/productApi";
import ProductCard from "../components/ProductCard.jsx";
import Pagination from "../components/Paginations.jsx";
import Search from "../components/Search.jsx";
import sortOptions from "../config/sortOptions.jsx";
import Sort from "../components/Sort.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductForm from "../components/ProductForm.jsx";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit")) || 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const skip = (page - 1) * limit;
  const [sort, setSort] = useState("new");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []));
      } catch (error) {
        console.error("Gagal mengambil kategori", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch produk
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data;
        if (searchKeyword) {
          data = await searchProducts(searchKeyword);
        } else if (selectedCategory === "all") {
          data = await getAllProducts(limit, skip);
        } else {
          data = await getProductsByCategory(selectedCategory, limit, skip);
        }
        setProducts(Array.isArray(data.products) ? data.products : []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Gagal fetch produk:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [limit, skip, selectedCategory, searchKeyword]);

  useEffect(() => {
    setSearchParams({ page, limit });
  }, [page, limit, setSearchParams]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "new") return b.id - a.id;
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

const handleSave = (savedProduct) => {
  if (editingProduct) {
    setProducts(prev =>
      prev.map(p => (p.id === editingProduct.id ? savedProduct : p))
    );
  } else {
    setProducts(prev => [savedProduct, ...prev]);
    setPage(1);
    setSelectedCategory("all");
  }
  setShowForm(false);
  setEditingProduct(null);
};

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-6 flex gap-6">
      {/* Sidebar kiri */}
      <div className="w-1/4 bg-white p-4 rounded-lg shadow-md flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Filter & Search</h2>
        
        <div className="mb-4">
          <Search onSearch={handleSearch} />
        </div>
        
        <div className="mb-4">
          <Sort sort={sort} setSort={setSort} options={sortOptions} />
        </div>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* Tombol Tambah Produk */}
        <div className="mt-auto">
          <button
            onClick={handleAddClick}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Tambah Produk
          </button>
        </div>
      </div>

      {/* Product list */}
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item) => <ProductCard key={item.id} product={item} />)
          ) : (
            <p className="col-span-4 text-center mt-4">Produk tidak ditemukan</p>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination total={total} limit={limit} page={page} setPage={setPage} />
        </div>
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
            onClick={handleCancel}
          ></div>

          <div className="relative bg-white p-6 rounded-lg w-96 shadow-lg">
            <ProductForm
              categories={categories}
              editingProduct={editingProduct}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
