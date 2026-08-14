// "use client";
import React from "react";
import Navbar from "./navbar";
import AddIcon from "./addicon";
import { useRef, useState } from "react";

const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const showPassword = () => {
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "src/assets/eye.png";
    } else {
      ref.current.src = "src/assets/eyecross.png";
    }
  };

  const savePassword = () => {};

  const handleChange = (e) => {};

  return (
    <div className="mx-auto max-w-2xl bg-gray-900 p-6 rounded-lg">
      <Navbar />

      <p className="text-gray-400 text-center mb-6">My Password Manager</p>

      <div className="text-white flex flex-col p-4 gap-3">
        <input
          value={form.site}
          className="rounded-full border border-gray-600 w-full text-black p-4 py-2 bg-gray-100"
          type="text"
          placeholder="https://www.website.name"
        />

        <div className="flex w-full gap-4">
          <input
            value={form.username}
            type="text"
            placeholder="username.123"
            className="rounded-full border border-gray-600 w-full text-black p-4 py-2 bg-gray-100"
          />
          <div className="relative w-full">
            <input
              type="text"
              placeholder="password123"
              className="rounded-full border border-gray-600 w-full text-black p-4 py-2 bg-gray-100 pr-12"
            />
            <img
              value={form.password}
              ref={ref}
              onClick={showPassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              width={24}
              height={24}
              src="src/assets/eye.png"
              alt="eye.png"
            />
          </div>
        </div>

        <button
          onClick={savePassword}
          className="text-white bg-cyan-500 hover:bg-cyan-600 border-none rounded-full py-3 px-4 w-full font-medium transition-colors flex items-center justify-center gap-2"
        >
          Add Password
          <AddIcon />
        </button>
      </div>
    </div>
  );
};

export default Manager;
