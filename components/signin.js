"use client";

import React, { useState } from "react";

function Signin({ canclesigin, userdetaisl }) {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mobileNumber = e.target.youtubefiroznumb.value;
    const password = e.target.youtubefiroapassword.value;
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div
        className="fixed top-0 ml-90"
        onClick={() => {
          canclesigin();
        }}
      >
        X
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="bg-black p-8 text-black rounded-lg shadow-lg w-full max-w-sm"
      >
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4 flex">
          <select className="h-full w-1/4 p-3 bg-gray-700 rounded-l-lg focus:outline-none focus:ring-0">
            <option value="1">+1</option>
            <option value="2">+91</option>
            <option value="3">+40</option>
          </select>
          <input
            autoComplete="off"
            className="w-3/4 bg-white rounded-r-lg focus:outline-none border-none focus:ring-0"
            type="number"
            id="youtubefiroznumb"
            placeholder="Mobile number"
            style={{
              boxShadow: "none",
              outline: "none",
              border: "none",
              padding: "0.5em",
              MozAppearance: "textfield",
            }}
            maxLength="10"
            onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
          />
        </div>
        <div className="mb-4 flex">
          <input
            autoComplete="off"
            id="youtubefiroapassword"
            className="flex-1 bg-white p-2 rounded-l-lg focus:outline-none focus:ring-0"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            style={{
              boxShadow: "none",
              outline: "none",
              border: "none",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="bg-[#ff1717] px-2 rounded-r-lg"
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>
        <button
          className="w-full bg-[#ff1717] py-2 rounded-lg mt-4"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </section>
  );
}

export default Signin;
