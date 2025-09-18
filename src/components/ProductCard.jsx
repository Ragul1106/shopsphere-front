import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getFullImageUrl } from "../utils/image";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // DRF serializer returns product.image as full path OR relative path (e.g., /media/...)
  const img = product?.image ? getFullImageUrl(product.image) : "/placeholder.png";

  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-lg transition">
      <img
        src={img}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3"
        onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="font-bold">₹{product.price}</div>
        <div className="flex gap-2">
          <Link to={`/product/${product.slug || product.id}`} className="text-blue-600 underline">View</Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
