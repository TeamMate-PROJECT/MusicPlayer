import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // ✅ Your custom global auth hook

function Login({ switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); // 🔐 Global auth handler

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/auth/login", { email, password })
      .then((result) => {
        console.log("Login Response:", result);

        if (result.data.status === "Success") {
          localStorage.setItem("user", JSON.stringify(result.data.user));
          localStorage.setItem("token", result.data.token);

          login(result.data.user);

          alert("Login successful!");
        } else {
          alert("Invalid Credentials. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Login Error:", err);
        alert("Login failed. Please check your credentials or try again later.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-4 text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              required
              className="w-full p-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              required
              className="w-full p-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">Don't have an account?</p>
        <div className="flex justify-center">
          <button
            onClick={switchToSignup}
            className="text-red-400 hover:underline mt-2"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
