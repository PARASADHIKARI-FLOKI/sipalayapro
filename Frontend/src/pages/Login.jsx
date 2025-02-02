import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import loginbg from "../assets/loginbg.jpg";

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(""); // "success", "error", or "loading"
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage("Processing your login...");
    setAlertType("loading");

    try {
      const response = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.role, data.name, data.email);
        setAlertMessage("User logged in successfully!");
        setAlertType("success");

        // Redirect after a short delay
        setTimeout(() => {
          setAlertMessage(null);
          navigate(`/dashboard/${data.role.toLowerCase()}`);
        }, 2000);
      } else {
        setAlertMessage("Login failed. Please check your credentials.");
        setAlertType("error");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setAlertMessage("Something went wrong. Please try again.");
      setAlertType("error");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      {/* Alert Message */}
      {alertMessage && (
        <div
          className="fixed right-5 top-1/2 transform -translate-y-1/2 px-10 py-6 bg-white shadow-xl rounded-lg flex items-center gap-6 z-50"
        >
          {loading && (
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
              ></path>
            </svg>
          )}
          <span
            className={`text-lg font-semibold ${
              alertType === "success"
                ? "text-green-600"
                : alertType === "error"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {alertMessage}
          </span>
        </div>
      )}

      {/* Login Form */}
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
