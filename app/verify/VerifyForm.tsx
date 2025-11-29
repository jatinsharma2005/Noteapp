"use client";

import { useState, useEffect } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function VerifyForm() {
  const params = useSearchParams();
  const emailFromURL = params.get("email") || "";

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Mask email for UI
  const maskEmail = (email: string): string => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return `${name[0]}*****@${domain}`;
  };

  useEffect(() => {
    setEmail(emailFromURL);

    // ⚡ Warm up backend so OTP verify loads instantly
    API.get("/auth/warmup").catch(() => {});
  }, [emailFromURL]);

  // ------------------------------------
  // VERIFY OTP
  // ------------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/verify-otp", { email, otp });
      const res = response.data;

      if (!res.success) {
        toast.error(res.message || "Invalid OTP");
        setLoading(false);
        return;
      }

      toast.success("Email verified successfully!");

      setTimeout(() => {
        window.location.href = "/login";
      }, 700);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // RESEND OTP
  // ------------------------------------
  const handleResend = async () => {
    if (!email) return;

    setResendLoading(true);

    try {
      const warm = await API.get("/auth/warmup").catch(() => {});

      const response = await API.post("/auth/register", {
        name: "temp",
        email,
        password: "temp123!@#", // backend ignores because email exists
      });

      const res = response.data;

      if (res.success) {
        toast.success("New OTP sent!");
      } else {
        toast.error(res.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setResendLoading(false);
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
          <input type="hidden" value={email} />

          <div>
            <label className="block mb-1 font-medium">Enter OTP</label>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="6-digit OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-4 py-2 rounded text-black"
            />
          </div>

          <button
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-blue-600 hover:underline"
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
