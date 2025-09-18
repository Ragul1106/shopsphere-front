import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductBySlug } from "../api/productService";
import { CartContext } from "../context/CartContext";
import { getFullImageUrl } from "../utils/image";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    fetchProductBySlug(slug)
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("Product fetch error", err);
      });
  }, [slug]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  const imageUrl = product.image
    ? getFullImageUrl(product.image)
    : "/placeholder.png";

  const handleAdd = () => {
    addToCart(product, qty);
    navigate("/cart"); // redirect after adding
  };

  return (
    <div className="p-8 container mx-auto grid md:grid-cols-2 gap-10">
      {/* Left: Product Image */}
      <div className="flex justify-center">
        <div className="overflow-hidden rounded-xl shadow-lg w-full h-full max-w-md">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full cursor-pointer object-cover transform hover:scale-105 transition duration-500"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
          />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Price & Stock */}
          <div className="mt-5">
            <span className="text-2xl font-semibold text-purple-600">
              ₹{product.price}
            </span>
            <span className="ml-4 text-sm text-gray-500">
              Stock: {product.stock_quantity ?? "—"}
            </span>
          </div>
        </div>

        {/* Qty + Add Button */}
        <div className="mt-6 flex items-center gap-3">
          <label className="font-medium">Qty:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="w-20 border px-2 py-1 rounded text-center"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 cursor-pointer hover:bg-green-700 active:scale-95 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
          >
            Add to Cart
          </button>
        </div>

        {/* Meta Info */}
        <div className="mt-6 text-sm text-gray-600 space-y-1">
          <div>
            <span className="font-medium">Category:</span>{" "}
            {product.category?.name || "Uncategorized"}
          </div>
          <div>
            <span className="font-medium">Added:</span>{" "}
            {product.created_at
              ? new Date(product.created_at).toLocaleDateString()
              : "—"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
