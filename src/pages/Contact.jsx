import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-2xl p-10 max-w-4xl w-full grid md:grid-cols-2 gap-10"
      >
        {/* Left side - Info */}
        <div>
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Get in Touch</h1>
          <p className="text-gray-600 mb-6">
            Have questions, feedback, or need assistance? Fill out the form or reach out using the details below. 
            We’d love to hear from you!
          </p>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-3">
              <Mail className="text-blue-600" /> support@shopshere.com
            </p>
            <p className="flex items-center gap-3">
              <Phone className="text-blue-600" /> +91 98765 43210
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-blue-600" /> Chennai, India
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <motion.form
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-5"
        >
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Name"
          />
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Your Email"
          />
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Your Message"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Send size={18} /> Send Message
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Contact;
