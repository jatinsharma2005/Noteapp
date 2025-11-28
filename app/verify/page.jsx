import { Suspense } from "react";
import dynamic from "next/dynamic";

const VerifyForm = dynamic(() => import("./VerifyForm"), {
  ssr: false,
});

export default function VerifyPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <VerifyForm />
    </Suspense>
  );
}
