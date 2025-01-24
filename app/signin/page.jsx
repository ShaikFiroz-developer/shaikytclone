"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AuthContext } from "../auth";

const serverurl =
  "https://vercel.com/shaik-firozs-projects/ytserver/9DJR3vL3TVYNWY2wXptxWuWCLPS2";
function Signin() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useContext(AuthContext); // Use AuthContext

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirect to home
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Send email and password to backend for authentication
      const response = await axios.post(
        `${serverurl}/api/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        const { user } = response.data;
        const { name, phone, email } = user;

        // Save user info to localStorage
        localStorage.setItem("name", name);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", email);

        alert("User logged in successfully");

        // Update auth state
        await checkAuth(); // Update the authentication status
        router.push("/"); // Redirect to home
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      setError("Error signing in, please try again");
    }
  };

  // Avoid rendering the form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-gray-800 to-black flex justify-center items-center">
      {/* Sign-in Form */}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Sign In
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Email Input */}
        <div className="mb-6">
          <input
            className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
            type="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6 flex">
          <input
            id="password"
            className="flex-1 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring focus:ring-red-500"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="bg-red-600 text-white px-4 rounded-r-lg"
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
          type="submit"
        >
          Sign In
        </button>

        {/* Link to Sign Up */}
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <span
            className="text-red-600 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign up now
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signin;
