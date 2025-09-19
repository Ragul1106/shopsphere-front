import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getFullImageUrl } from "../utils/image";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // DRF serializer returns product.image as full path OR relative path (e.g., /media/...)
  const img = product?.image ? getFullImageUrl(product.image) : "/placeholder.png";

  return (
    <div className="group relative p-5 dark:bg-gray-900, dark:text-gray-400 border border-amber-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-[1.02]">
      <img
        src={img}
        alt={product.name}
        className="w-full h-48 object-contain rounded mb-3"
        onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="font-bold">₹{product.price}</div>
        <div className="flex gap-2">
          <Link to={`/product/${product.slug || product.id}`} className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition duration-300" >View</Link>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white cursor-pointer px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import { getFullImageUrl } from "../utils/image";

// const ProductCard = ({ product }) => {
//   const { addToCart } = useContext(CartContext);

//   const img = product?.image
//     ? getFullImageUrl(product.image)
//     : "/placeholder.png";

//   return (
//     <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-[1.02]">
//       {/* Product Image */}
//       <div className="overflow-hidden">
//         <img
//           src={img}
//           alt={product.name}
//           className="w-full h-56 object-contain transform group-hover:scale-110 transition duration-500"
//           onError={(e) => {
//             e.currentTarget.src = "/placeholder.png";
//           }}
//         />
//       </div>

//       {/* Product Info */}
//       <div className="p-4 flex flex-col justify-between h-44">
//         <div>
//           <h3 className="font-semibold text-lg truncate">{product.name}</h3>
//           <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//             {product.description}
//           </p>
//         </div>

//         {/* Price + Actions */}
//         <div className="mt-4 flex items-center justify-between">
//           <span className="font-bold text-purple-600 text-lg">
//             ₹{product.price}
//           </span>
//           <div className="flex gap-2">
            
//             <Link
//               to={`/product/${product.slug || product.id}`}
//               className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition duration-300"
//             >
//               View
//             </Link>
//             <button
//               onClick={() => addToCart(product)}
//               className="text-sm px-3 py-1.5 rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 active:scale-95 transition duration-300"
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Glow effect */}
//       <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-purple-400 group-hover:shadow-lg transition duration-300"></div>
//     </div>
//   );
// };

// export default ProductCard;
