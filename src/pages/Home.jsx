import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; 
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products/");
        setProducts(Array.isArray(res.data.results) ? res.data.results : res.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productsToShow = Array.isArray(products) ? products.slice(0, 3) : [];

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: { onClick: { enable: true, mode: "push" }, onHover: { enable: true, mode: "repulse" }, resize: true },
      modes: { push: { quantity: 4 }, repulse: { distance: 100, duration: 0.4 } },
    },
    particles: {
      color: { value: ["#00ffff", "#ff00ff", "#ffff00", "#00ff88"] }, // neon on dark bg
      links: { enable: true, color: "#888", distance: 150, opacity: 0.3, width: 1 },
      collisions: { enable: true },
      move: { direction: "none", enable: true, outModes: "bounce", random: true, speed: 2, straight: false },
      number: { density: { enable: true, area: 800 }, value: 50 },
      opacity: { value: 0.6 },
      shape: { type: "circle" },
      size: { value: { min: 2, max: 6 } },
    },
    detectRetina: true,
  };

  return (
    <div className="w-full bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="relative h-75 flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white px-6">
        <Particles className="absolute inset-0 z-0" init={particlesInit} options={particlesOptions} />
        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to ShopSphere
        </h1>
        <p className="relative z-10 text-xl md:text-2xl mb-6 text-gray-300">
          The best place to buy your favorite products online.
        </p>
        <Link
          to="/products"
          className="relative z-10 bg-purple-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 hover:scale-110 transition-all duration-300"
        >
          Shop Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: "🚚", title: "Fast Delivery", desc: "Get your products delivered in record time." },
            { icon: "💳", title: "Secure Payment", desc: "All payments are 100% secure and encrypted." },
            { icon: "⭐", title: "Best Quality", desc: "We offer only high-quality products." },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center cursor-pointer">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {["Hindu Wedding", "Muslim Wedding", "Christian Wedding", "Interfaith Wedding"].map((cat, index) => (
            <div
              key={index}
              className="relative group rounded-2xl p-6 text-center bg-gray-800 shadow-lg 
             hover:scale-105 transition-transform duration-300"
            >
              
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                  transition duration-300 blur-md 
                  bg-gradient-to-r from-cyan-400 to-pink-500 -z-10"></div>

              <div className="text-6xl mb-4 animate-bounce">📦</div>
              <h3 className="text-xl font-bold text-white">{cat}</h3>
            </div>

          ))}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-20 px-6 bg-gray-950">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Popular Products</h2>
        {loading ? (
          <p className="text-center py-10 text-gray-400">Loading products...</p>
        ) : productsToShow.length === 0 ? (
          <p className="text-center py-10 text-gray-400">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {productsToShow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-950">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { name: "Ragul R", msg: "Amazing shopping experience! Fast delivery and great products." },
            { name: "Magizh V", msg: "High-quality items and excellent customer support." },
            { name: "Arul R", msg: "Love the website design and easy checkout process." },
          ].map((test, index) => (
            <div key={index} className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <p className="italic text-gray-300 mb-4">"{test.msg}"</p>
              <h4 className="font-semibold text-white">{test.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6  bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
        <p className="mb-6 text-gray-300">Explore our wide range of products and find what you love!</p>
        <Link
          to="/products"
          className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default Home;




// import React, { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";  // ✅ works with v2.11.0
// import axiosInstance from "../api/axios";
// import toast from "react-hot-toast";
// import ProductCard from "../components/ProductCard";

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Initialize particles safely
//   const particlesInit = useCallback(async (engine) => {
//     // load the full tsParticles package into the engine
//     await loadFull(engine);
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axiosInstance.get("/products/");
//         setProducts(Array.isArray(res.data.results) ? res.data.results : res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//         toast.error("Failed to load products.");
//         setProducts([]); // fallback
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const productsToShow = Array.isArray(products) ? products.slice(0, 3) : [];

//   const particlesOptions = {
//     background: { color: { value: "transparent" } },
//     fpsLimit: 60,
//     interactivity: {
//       events: {
//         onClick: { enable: true, mode: "push" },
//         onHover: { enable: true, mode: "repulse" },
//         resize: true,
//       },
//       modes: {
//         push: { quantity: 4 },
//         repulse: { distance: 100, duration: 0.4 },
//       },
//     },
//     particles: {
//       color: { value: ["#ff00ff", "#00ffff", "#ffff00", "#ff6600"] },
//       links: {
//         enable: true,
//         color: "#ffffff",
//         distance: 150,
//         opacity: 0.3,
//         width: 1,
//       },
//       collisions: { enable: true },
//       move: {
//         direction: "none",
//         enable: true,
//         outModes: "bounce",
//         random: true,
//         speed: 2,
//         straight: false,
//       },
//       number: { density: { enable: true, area: 800 }, value: 50 },
//       opacity: { value: 0.5 },
//       shape: { type: "circle" },
//       size: { value: { min: 2, max: 6 } },
//     },
//     detectRetina: true,
//   };

//   return (
//     <div className="w-full">
//       {/* Hero Section */}
//       <section className="relative h-75 flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white px-6">
//         <Particles
//           className="absolute inset-0 z-0"
//           init={particlesInit}
//           options={particlesOptions}
//         />
//         <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold mb-4 animate-pulse drop-shadow-lg">
//           Welcome to ShopSphere
//         </h1>
//         <p className="relative z-10 text-xl md:text-2xl mb-6 drop-shadow-md">
//           The best place to buy your favorite products online.
//         </p>
//         <Link
//           to="/products"
//           className="relative z-10 bg-white text-purple-600 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
//         >
//           Shop Now
//         </Link>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-6 bg-gray-50">
//         <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           {[
//             { icon: "🚚", title: "Fast Delivery", desc: "Get your products delivered in record time." },
//             { icon: "💳", title: "Secure Payment", desc: "All payments are 100% secure and encrypted." },
//             { icon: "⭐", title: "Best Quality", desc: "We offer only high-quality products." },
//           ].map((feature, index) => (
//             <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center cursor-pointer">
//               <div className="text-5xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="py-20 px-6 bg-gradient-to-r from-purple-50 to-pink-50">
//         <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
//           {["Hindu Wedding", "Muslim Wedding", "Christian Wedding", "Interfaith Wedding"].map((cat, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300"
//             >
//               <div className="text-6xl mb-4 animate-bounce">📦</div>
//               <h3 className="text-xl font-bold">{cat}</h3>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Popular Products Section */}
//       <section className="py-20 px-6 bg-gray-100">
//         <h2 className="text-4xl font-bold text-center mb-12">Popular Products</h2>
//         {loading ? (
//           <p className="text-center py-10">Loading products...</p>
//         ) : productsToShow.length === 0 ? (
//           <p className="text-center py-10">No products available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {productsToShow.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//         <div className="text-center mt-12">
//           <Link
//             to="/products"
//             className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300"
//           >
//             View All Products
//           </Link>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 px-6 bg-gradient-to-r from-yellow-50 via-pink-50 to-purple-50">
//         <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           {[
//             { name: "Ragul R", msg: "Amazing shopping experience! Fast delivery and great products." },
//             { name: "Magizh V", msg: "High-quality items and excellent customer support." },
//             { name: "Arul R", msg: "Love the website design and easy checkout process." },
//           ].map((test, index) => (
//             <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
//               <p className="italic text-gray-600 mb-4">"{test.msg}"</p>
//               <h4 className="font-semibold">{test.name}</h4>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-20 px-6 bg-purple-600 text-white text-center">
//         <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
//         <p className="mb-6">Explore our wide range of products and find what you love!</p>
//         <Link
//           to="/products"
//           className="bg-yellow-400 text-purple-700 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
//         >
//           Shop Now
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default Home;
