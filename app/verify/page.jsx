"use client";

import { Suspense } from "react";
import VerifyForm from "./VerifyForm";

export default function VerifyPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <VerifyForm />
    </Suspense>
  );
}
