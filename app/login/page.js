"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../utils/api";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      if (!res.data.success) {
        toast.error(res.data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      {/* Small Home Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-5 left-5 text-blue-600 hover:underline text-sm font-medium"
      >
        ← Home
      </button>

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-black">
          <div>
            <label className="block mb-1 font-medium text-black">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-black">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-800 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
