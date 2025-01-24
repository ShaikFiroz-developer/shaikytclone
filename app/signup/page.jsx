"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../auth";

const serverurl =
  "https://vercel.com/shaik-firozs-projects/ytserver/9DJR3vL3TVYNWY2wXptxWuWCLPS2";

function Signup({ cancelSignup }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collecting form data
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
      address: e.target.address.value,
    };

    try {
      const response = await fetch(`${serverurl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error((await response.json()).message || "Failed to sign up");
      }
      alert("registration successful");
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-gray-900 to-black flex justify-center items-center">
      {/* Close Button */}
      <div
        className="absolute top-4 right-4 text-white cursor-pointer text-2xl font-bold"
        onClick={() => router.push("/")}
      >
        X
      </div>

      {/* Sign-up Form */}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            required
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4 flex">
          <select
            className="h-full w-1/4 p-3 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring focus:ring-red-300"
            defaultValue="+91"
          >
            <option value="1">+1</option>
            <option value="91">+91</option>
            <option value="40">+40</option>
          </select>
          <input
            type="number"
            id="phone"
            placeholder="Phone Number"
            maxLength="10"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
            className="w-3/4 bg-gray-700 text-white p-3 rounded-r-lg focus:outline-none focus:ring focus:ring-red-300"
            required
          />
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <textarea
            id="address"
            placeholder="Address"
            className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Password Input */}
        <div className="mb-6 flex">
          <input
            type={showPass ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="flex-1 bg-gray-700 text-white p-3 rounded-l-lg focus:outline-none focus:ring focus:ring-red-300"
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
          Sign Up
        </button>

        {/* Link to Sign In */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            className="text-red-600 cursor-pointer hover:underline"
            onClick={() => router.push("/signin")}
          >
            Sign in now
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
