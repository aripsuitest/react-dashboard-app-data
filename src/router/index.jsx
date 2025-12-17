import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
