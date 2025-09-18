import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const pageSize = 10;

  const totalPages = Math.ceil(count / pageSize);

  const fetchProducts = async (page = 1, selectedCategory = category) => {
    setLoading(true);
    try {
      const categoryFilter = selectedCategory
        ? `&category__slug=${selectedCategory}`
        : "";
      const res = await axiosInstance.get(
        `/products/?page=${page}${categoryFilter}`
      );
      setProducts(res.data.results);
      setCount(res.data.count);
      setCurrentPage(page);
    } catch (err) {
      console.error("❌ Fetch Products Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, category);
  }, [category]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Products
      </h1>

      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {[
          { label: "All", value: "" },
          { label: "Hindu Wedding", value: "hindu-wedding" },
          { label: "Muslim Wedding", value: "muslim-wedding" },
          { label: "Christian Wedding", value: "christian-wedding" },
          { label: "Interfaith Wedding", value: "interfaith-wedding" },
        ].map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setCategory(cat.value);
              setCurrentPage(1); 
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium shadow transition ${
              category === cat.value
                ? "bg-purple-700 text-white"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-lg font-medium">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => fetchProducts(currentPage - 1, category)}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500  cursor-not-allowed"
                    : "bg-purple-600 text-white cursor-pointer hover:bg-purple-700"
                }`}
              >
                ◀
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => fetchProducts(page, category)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-purple-800 text-white cursor-pointer font-bold"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Right Arrow */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => fetchProducts(currentPage + 1, category)}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 text-white cursor-pointer hover:bg-purple-700"
                }`}
              >
                ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
