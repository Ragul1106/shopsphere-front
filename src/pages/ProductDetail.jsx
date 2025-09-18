import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductBySlug } from "../api/productService";
import { CartContext } from "../context/CartContext";
import { getFullImageUrl } from "../utils/image";

const ProductDetail = () => {
  const { slug } = useParams(); // backend uses slug as lookup
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

  if (!product) return <div className="p-10">Loading product...</div>;

  const imageUrl = product.image ? getFullImageUrl(product.image) : "/placeholder.png";

  const handleAdd = () => {
    addToCart(product, qty);
    // optional: navigate to cart or show toast
    navigate("/cart");
  };

  return (
    <div className="p-8 container mx-auto grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-auto rounded shadow"
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
        />
      </div>

      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700 mt-3">{product.description}</p>
        <div className="mt-4">
          <span className="text-2xl font-semibold">₹{product.price}</span>
          <span className="ml-4 text-sm text-gray-500">Stock: {product.stock_quantity ?? "—"}</span>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <label>Qty:</label>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="w-20 border px-2 py-1 rounded"
          />
          <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <div>Category: {product.category?.name || "Uncategorized"}</div>
          <div>Added: {new Date(product.created_at).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
