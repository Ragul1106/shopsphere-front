import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import axiosInstance from "../api/axios"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("You must be logged in to send a message.");
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      await axiosInstance.post("/contacts/", formData);
      setSuccess("Thanks for contacting us! Check your email for confirmation.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form submission error:", err);
      alert("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

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
            <p className="flex items-center gap-3"><Mail className="text-blue-600" /> support@shopshere.com</p>
            <p className="flex items-center gap-3"><Phone className="text-blue-600" /> +91 98765 43210</p>
            <p className="flex items-center gap-3"><MapPin className="text-blue-600" /> Chennai, India</p>
          </div>
        </div>

        {/* Right side - Form */}
        <motion.form
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          {!isLoggedIn && (
            <p className="text-red-500 font-semibold mb-2">
              You must be logged in to send a message.
            </p>
          )}

          {success && <p className="text-green-600 font-semibold">{success}</p>}

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Name"
            required
            disabled={!isLoggedIn}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your Email"
            required
            disabled={!isLoggedIn}
          />
          <input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Subject"
            required
            disabled={!isLoggedIn}
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Your Message"
            required
            disabled={!isLoggedIn}
          ></textarea>
          <button
            type="submit"
            disabled={!isLoggedIn || loading}
            className={`w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md
              ${isLoggedIn ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
            <Send size={18} /> {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Contact;




// import React from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin, Send } from "lucide-react";

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-8">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="bg-white shadow-xl rounded-2xl p-10 max-w-4xl w-full grid md:grid-cols-2 gap-10"
//       >
//         {/* Left side - Info */}
//         <div>
//           <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Get in Touch</h1>
//           <p className="text-gray-600 mb-6">
//             Have questions, feedback, or need assistance? Fill out the form or reach out using the details below. 
//             We’d love to hear from you!
//           </p>
//           <div className="space-y-4 text-gray-700">
//             <p className="flex items-center gap-3">
//               <Mail className="text-blue-600" /> support@shopshere.com
//             </p>
//             <p className="flex items-center gap-3">
//               <Phone className="text-blue-600" /> +91 98765 43210
//             </p>
//             <p className="flex items-center gap-3">
//               <MapPin className="text-blue-600" /> Chennai, India
//             </p>
//           </div>
//         </div>

//         {/* Right side - Form */}
//         <motion.form
//           initial={{ opacity: 0, x: 80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="space-y-5"
//         >
//           <input
//             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Your Name"
//           />
//           <input
//             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             type="email"
//             placeholder="Your Email"
//           />
//           <textarea
//             className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             rows="4"
//             placeholder="Your Message"
//           ></textarea>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
//           >
//             <Send size={18} /> Send Message
//           </button>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// };

// export default Contact;
