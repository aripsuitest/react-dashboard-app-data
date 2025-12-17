import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../api/productApi";

const ProductForm = ({ editingProduct = null, onSave, onCancel, categories = [] }) => {
  const [formData, setFormData] = useState(() => {
    if (editingProduct) {
      return {
        title: editingProduct.title || "",
        price: String(editingProduct.price || ""),
        description: editingProduct.description || "",
        categoryId: editingProduct.categoryId || categories[0]?.id || "",
        image: null,
        preview: editingProduct.images?.[0] || "" // ambil gambar pertama dari array
      };
    }
    return {
      title: "",
      price: "",
      description: "",
      categoryId: categories[0]?.id || "",
      image: null,
      preview: ""
    };
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editingProduct && categories.length > 0) {
      setFormData(prev => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null, preview: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price) {
      alert("Title dan price harus diisi!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("categoryId", formData.categoryId);
      if (formData.image) data.append("image", formData.image);

      let result;
      if (editingProduct) {
        result = await updateProduct(editingProduct.id, data);
      } else {
        result = await addProduct(data);
      }

      if (onSave) onSave(result);

      // Reset form jika tambah produk baru
      if (!editingProduct) {
        setFormData({
          title: "",
          price: "",
          description: "",
          categoryId: categories[0]?.id || "",
          image: null,
          preview: ""
        });
      }
    } catch (err) {
      alert(err.message || "Gagal menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {editingProduct ? "Edit Product" : "Tambah Product"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-3 py-2 border rounded-lg"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded-lg"
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={cat.id || index} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded px-2 py-1"
          />
          {formData.preview && (
            <div className="relative w-48 h-48 mt-2">
              <img
                src={formData.preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
