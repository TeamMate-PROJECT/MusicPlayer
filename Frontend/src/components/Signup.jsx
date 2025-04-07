import { useState } from "react";
import axios from "axios";

function Signup({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/register", { name, email, password })
      .then((result) => {
        console.log(result);
        alert("Registered successfully! Please login.");
        switchToLogin(); // 🔁 Switch to login after successful registration
      })
      .catch((err) => {
        console.error(err);
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-4 text-white">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              required
              className="w-full p-2 border border-gray-700 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Register
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">Already have an account?</p>
        <div className="flex justify-center">
          <button
            onClick={switchToLogin}
            className="text-red-400 hover:underline mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
