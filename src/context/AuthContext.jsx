// // context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from "react";
// import { getProfile } from "../api/authService";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       getProfile()
//         .then((data) => setUser(data))
//         .catch(() => {
//           localStorage.removeItem("access_token");
//           localStorage.removeItem("refresh_token");
//         });
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     setUser(null);
//     window.location.href = "/";
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect } from "react";
import { getProfile, login as loginService } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount, load profile if access token exists
  useEffect(() => {
  const token = localStorage.getItem('access_token');
  if (token) {
    getProfile()
      .then(data => {
        // console.log("Profile API response:", data); // <-- add this
        setUser({
          email: data.user?.email,
          username: data.user?.username,
          first_name: data.user?.first_name,
          last_name: data.user?.last_name,
        });
      })
      .catch(() => {
        localStorage.removeItem('access_token');
      });
  }
}, []);


  const login = async (email, password) => {
    try {
      await loginService(email, password); // call backend login
      const profile = await getProfile(); // fetch user info
      setUser({ email: profile.user?.email || profile.user });
      return true; // success
    } catch (err) {
      console.error("Login failed:", err);
      return false; // failure
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
