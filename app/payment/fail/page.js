"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="container mx-auto max-w-md py-20">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">支付失败</h1>
        <p className="mb-6 text-gray-500">
          非常抱歉，您的支付未能完成。请重试或联系客服。
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/payment" passHref>
            <Button variant="outline">返回个人中心</Button>
          </Link>
          <Link href="https://work.weixin.qq.com/kfid/kfced8cb0bab7e20795" passHref>
            <Button>联系客服</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
