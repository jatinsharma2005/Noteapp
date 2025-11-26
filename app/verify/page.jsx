"use client";

import { useState, useEffect } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function Verify() {
  const params = useSearchParams();
  const emailFromURL = params.get("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Mask email for display
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name[0] + "*****@" + domain;
  };

  useEffect(() => {
    if (emailFromURL) {
      setEmail(emailFromURL);
    }
  }, [emailFromURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/verify-otp", { email, otp });

    if (res.data.success) {
      toast.success("Email verified! You can log in now.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 600);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="p-6 bg-white rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-black">
          Verify your Email
        </h1>

        <p className="text-center text-gray-700 mb-4">
          We sent an OTP to:
          <span className="font-semibold text-black block mt-1">
            {maskEmail(email)}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Hidden Email */}
          <input type="hidden" name="email" value={email} />

          <div>
            <label className="block mb-1 font-medium">Enter OTP</label>
            <input
              name="otp"
              placeholder="6-digit OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-4 py-2 rounded text-black"
              required
            />
          </div>

          <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
