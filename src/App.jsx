import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyOrders from "./pages/Myorders";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-orders" element={<MyOrders />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 text-center p-4">© {new Date().getFullYear()} ShopSphere</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import ProductDetail from './pages/ProductDetail';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import OrderSuccess from './pages/OrderSuccess';
// import Profile from './pages/Profile';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';

// function App(){
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <BrowserRouter>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home/>} />
//             <Route path="/products" element={<Products/>} />
//             <Route path="/product/:slug" element={<ProductDetail/>} />
//             <Route path="/login" element={<Login/>} />
//             <Route path="/register" element={<Register/>} />
//             <Route path="/cart" element={<Cart/>} />
//             <Route path="/checkout" element={<Checkout/>} />
//             <Route path="/order-success/:id" element={<OrderSuccess/>} />
//             <Route path="/profile" element={<Profile/>} />
//             <Route path="/about" element={<div className='p-4'>About</div>} />
//             <Route path="/contact" element={<div className='p-4'>Contact</div>} />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;
