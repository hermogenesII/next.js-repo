"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

export default function Practice() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      setMessage("Name is required");
      return;
    } else {
      setMessage("Registered Successful!");
      setFormData({
        username: "",
        name: "",
        password: "",
      });
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[url('/login-background.jpg')] bg-cover bg-center">
      <div className="flex min-w-[500px] justify-center p-4 text-center">
        <div className="w-full max-w-lg">
          <h1 className="text-5xl font-bold text-black">Servi-Seek</h1>
          <h3 className="text-2xl text-gray-600">
            Marinduque's Marketplace of Services
          </h3>
          <div className="m-3 p-5 bg-gray-100 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <h1 className="text-xl font-bold text-black">Register</h1>
                {message && <p className="text-green-600">{message}</p>}
              </div>
              <div className="flex flex-col text-start">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="py-2 px-3"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="py-2 px-3"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start">
                <label htmlFor="password">Password:</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="py-2 px-3"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="bg-sky-500 w-full rounded-xl p-3"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
