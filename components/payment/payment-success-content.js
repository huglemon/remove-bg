"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [orderDetails] = useState({
    orderNo: searchParams.get("orderNo") || "未知",
    amount: searchParams.get("amount") || "0.00",
  });

  useEffect(() => {
    // 可以在这里加载订单详情
  }, []);

  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="rounded-lg bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-800">支付成功</h1>
        <p className="mb-6 text-gray-500">您的订单已成功支付，感谢您的购买！</p>

        <div className="mb-6 rounded bg-gray-50 p-4">
          <div className="mb-2 flex justify-between">
            <span className="text-gray-500">订单号</span>
            <span className="font-medium">{orderDetails.orderNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">支付金额</span>
            <span className="font-medium text-red-500">
              ¥{orderDetails.amount}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/dashboard" passHref>
            <Button variant="outline">返回个人中心</Button>
          </Link>
          <Link href="/batch" passHref>
            <Button>开始批量抠图</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 