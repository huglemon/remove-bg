"use client";

import { Suspense } from "react";
import { PaymentSuccessContent } from "@/components/payment/payment-success-content";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessLoading() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="rounded-lg bg-white p-8 text-center shadow-md animate-pulse">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100/50"></div>
        <div className="mb-2 h-8 bg-gray-200 rounded"></div>
        <div className="mb-6 h-4 bg-gray-100 rounded"></div>
        <div className="mb-6 rounded bg-gray-50 p-4">
          <div className="mb-2 flex justify-between">
            <div className="h-4 w-20 bg-gray-100 rounded"></div>
            <div className="h-4 w-24 bg-gray-100 rounded"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-100 rounded"></div>
            <div className="h-4 w-16 bg-gray-100 rounded"></div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-32 bg-green-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}
