import React from "react";
import { FaShippingFast, FaLock, FaHeadset, FaStar } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About MyShop</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          We are more than just an e-commerce store. MyShop is your trusted
          destination for quality products, unbeatable value, and a seamless
          shopping experience.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 container mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to provide customers with premium quality products at
            affordable prices while ensuring secure payments, fast delivery, and
            world-class customer support.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to be a leading e-commerce platform that customers trust and
            love. By leveraging technology and innovation, we strive to make
            shopping simpler, faster, and more enjoyable.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          <div className="text-center">
            <FaShippingFast className="text-purple-600 text-5xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick and reliable shipping right to your doorstep.
            </p>
          </div>
          <div className="text-center">
            <FaLock className="text-purple-600 text-5xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Safe and encrypted transactions for peace of mind.
            </p>
          </div>
          <div className="text-center">
            <FaHeadset className="text-purple-600 text-5xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our friendly team is always here to help you.
            </p>
          </div>
          <div className="text-center">
            <FaStar className="text-purple-600 text-5xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Top Quality</h3>
            <p className="text-gray-600">
              We handpick products that meet the highest standards.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="max-w-2xl mx-auto mb-6 opacity-90">
          At MyShop, we’re passionate about bringing you the best products and
          experiences. Thank you for trusting us. Let’s build a better shopping
          journey together!
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-lg hover:scale-105 transition"
        >
          Explore Products
        </a>
      </section>
    </div>
  );
};

export default About;
