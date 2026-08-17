// manager.jsx
import React from "react";
import Navbar from "./navbar";
import AddIcon from "./addicon";
import Footer from "./footer";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordref = useRef();
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPassword = async () => {
    let result = await fetch("http://localhost:3000/");
    let show = await result.json();
    setpasswordArray(show);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("eyecross.png")) {
      ref.current.src = "src/assets/eye.png";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "src/assets/eyecross.png";
      passwordref.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill in all fields before saving.");
      return;
    }
    let res = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, uuid: uuidv4() }),
    });

    setform({ site: "", username: "", password: "" });
    getPassword();
  };

  const deleteItem = async (uuid) => {
    const newArray = passwordArray.filter((item) => item.uuid !== uuid);
    setpasswordArray(newArray);
    let res = await fetch("http://localhost:3000", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid }),
    });
  };

  const editItem = async (uuid) => {
    const item_to_edit = passwordArray.filter((i) => i.uuid === uuid)[0];

    setform(item_to_edit);

    const newArray = passwordArray.filter((i) => i.uuid !== uuid);
    setpasswordArray(newArray);

    await fetch("http://localhost:3000", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid }),
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copytext = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto max-w-2xl bg-gray-900 p-6 rounded-lg">
      <Navbar />
      <p className="text-gray-400 text-center mb-6">My Password Manager</p>
      <div className="text-white flex flex-col p-4 gap-3">
        <input
          value={form.site}
          onChange={handleChange}
          className="rounded-full border border-gray-600 w-full text-black p-4 py-2 bg-gray-100"
          type="text"
          placeholder="https://www.website.name"
          name="site"
        />

        <div className="flex w-full gap-4">
          <input
            value={form.username}
            onChange={handleChange}
            type="text"
            placeholder="username.123"
            className="rounded-full border border-gray-600 w-full text-black p-4 py-2 bg-gray-100"
            name="username"
          />
          <div className="relative w-full">
            <input
              ref={passwordref}
              value={form.password}
              onChange={handleChange}
              type="text"
              placeholder="password123"
              className="rounded-full border border-gray-600 w-full text-black p-4 py-2 bg-gray-100 pr-12"
              name="password"
            />
            <img
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

      <div className="password mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold">Your Passwords</h2>

          <span className="text-sm text-gray-500">
            {passwordArray.length} saved
          </span>
        </div>

        {passwordArray.length === 0 ? (
          <div className="border border-gray-700 rounded-xl bg-gray-800/50 py-12 text-center">
            <div className="text-gray-500 text-4xl mb-3">🔒</div>

            <h3 className="text-white text-lg font-semibold mb-1">
              No passwords to show
            </h3>

            <p className="text-gray-500 text-sm">
              Add your first password using the form above.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800 border-b border-gray-700">
                    <th className="text-left px-5 py-4 text-cyan-400 font-semibold">
                      Website
                    </th>

                    <th className="text-left px-5 py-4 text-cyan-400 font-semibold">
                      Username
                    </th>

                    <th className="text-left px-5 py-4 text-cyan-400 font-semibold">
                      Password
                    </th>

                    <th className="text-center px-5 py-4 text-cyan-400 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {passwordArray.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/40 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-cyan-400 transition-colors"
                        >
                          {item.site}
                        </a>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300">{item.username}</span>

                          <img
                            src="src/assets/copy.png"
                            alt="Copy username"
                            width={18}
                            height={18}
                            className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                            onClick={() => {
                              copytext(item.username);
                            }}
                          />
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300 font-mono">
                            {item.password}
                          </span>

                          <img
                            src="src/assets/copy.png"
                            alt="Copy password"
                            width={18}
                            height={18}
                            className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                            onClick={() => {
                              copytext(item.password);
                            }}
                          />
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              editItem(item.uuid);
                            }}
                            className="px-3 py-1.5 rounded-lg text-cyan-400
                      border border-cyan-500/30
                      hover:bg-cyan-500/10
                      transition-colors"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              deleteItem(item.uuid);
                            }}
                            className="px-3 py-1.5 rounded-lg text-red-400
                      border border-red-500/30
                      hover:bg-red-500/10
                      transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Manager;
