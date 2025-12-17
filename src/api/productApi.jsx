const BASE = "https://dummyjson.com/products";

export async function getAllProducts(limit = 10, skip = 0){
  const res = await fetch(`${BASE}?limit=${limit}&skip=${skip}`);
  return res.json();
}

//search products by keyword
export async function searchProducts(keyword) {
  const res = await fetch(`${BASE}/search?q=${keyword}`);
  return res.json();
}

export async function getProductById(id){
  const res = await fetch(`${BASE}/${id}`);
  return res.json();
}

export async function getProductsByCategory(category){
  const res = await fetch(`${BASE}/category/${category}`);
  return res.json();
}

export async function getAllCategories() {
  const res = await fetch(`${BASE}/categories`);
  return res.json();
}       


export async function addProduct(data) {
  const res = await fetch(`${BASE}/add`, {
    method: "POST",
    body: data, // FormData langsung bisa dikirim
  });
  if (!res.ok) throw new Error("Gagal menambah produk");
  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`${BASE}/update/${id}`, {
    method: "PUT",
    body: data,
  });
  if (!res.ok) throw new Error("Gagal update produk");
  return res.json();
}


export async function getProducts() {
  const res = await fetch(BASE); // endpoint GET untuk semua produk
  if (!res.ok) throw new Error("Gagal mengambil produk");
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}