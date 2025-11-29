"use client";

import { Suspense, useEffect } from "react";
import VerifyForm from "./VerifyForm";

export const dynamic = "force-dynamic";

export default function VerifyPage() {
  // OPTIONAL: Wake backend instantly for faster OTP verify loading
  useEffect(() => {
    fetch("https://noteapp-backend-1tjz.onrender.com/api/auth/warmup").catch(
      () => {}
    );
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
