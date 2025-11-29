"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "../utils/api";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // -----------------------------
  // EMAIL VALIDATION (Gmail only)
  // -----------------------------
  const validateEmail = (value: string) => {
    if (!value.endsWith("@gmail.com")) {
      setEmailError("Only Gmail accounts are allowed (@gmail.com)");
    } else {
      setEmailError("");
    }
  };

  // -----------------------------
  // PASSWORD STRENGTH CHECKER
  // -----------------------------
  const checkPasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return "Weak";
    if (strength === 2) return "Medium";
    return "Strong";
  };

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(form.password));
  }, [form.password]);

  // -----------------------------
  // INPUT HANDLER
  // -----------------------------
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") validateEmail(value);
  };

  // -----------------------------
  // SUBMIT (INSTANT OTP)
  // -----------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (emailError) {
      toast.error("Please enter a valid Gmail");
      return;
    }

    setLoading(true);

    try {
      // ⚡ Step 1 — Wake up Render backend instantly
      await API.get("/auth/warmup").catch(() => {});

      // ⚡ Step 2 — Register user instantly
      const response = await API.post("/auth/register", form);
      const res = response.data;

      if (!res.success) {
        toast.error(res.message || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("OTP sent instantly!");

      // ⚡ Step 3 — Redirect to OTP page instantly
      router.push(`/verify?email=${form.email}`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // PASSWORD STRENGTH COLORS
  // -----------------------------
  const strengthColor =
    passwordStrength === "Weak"
      ? "text-red-600"
      : passwordStrength === "Medium"
      ? "text-orange-500"
      : "text-green-600";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      <button
        onClick={() => router.push("/")}
        className="absolute top-5 left-5 text-blue-600 hover:underline text-sm font-medium"
      >
        ← Home
      </button>

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 text-black">
          {/* NAME */}
          <div>
            <label className="block mb-1 font-medium text-black">Name</label>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 font-medium text-black">Gmail</label>
            <input
              name="email"
              type="email"
              placeholder="example@gmail.com"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />

            {emailError && (
              <p className="text-red-600 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter strong password"
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />

            {form.password && (
              <p className={`mt-1 text-sm font-semibold ${strengthColor}`}>
                Password Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-800 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
