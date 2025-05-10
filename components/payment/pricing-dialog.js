"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { PaymentButton } from "@/components/payment/payment-button";

export default function PricingDialog({ uid, children }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-center font-smiley text-4xl font-bold">
            选择您的套餐
          </DialogTitle>
          <p className="text-center text-sm text-gray-500">
            已付费用户付款后将叠加延长有效期
          </p>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
          {/* 月度套餐 */}
          <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">月度套餐</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">¥9.9</span>
                <span className="ml-1 text-gray-500">/月</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>批量抠图无限次</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>有效期30天</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>优先客服支持</span>
                </li>
              </ul>
            </div>
            <PaymentButton uid={uid} amount={990} subject="乘风智能抠图30天VIP" />
          </div>

          {/* 年度套餐 */}
          <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex-1">
              <h3 className="text-xl font-semibold">年度套餐</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">¥66</span>
                <span className="ml-1 text-gray-500">/年</span>
              </div>
              <ul className="mb-4 mt-6 space-y-4">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>批量抠图无限次</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>有效期365天</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>优先客服支持</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  <span>专属客服通道</span>
                </li>
              </ul>
            </div>
            <PaymentButton
              uid={uid}
              amount={6600}
              subject="乘风智能抠图365天VIP"
            />
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <p className="text-center text-sm text-gray-500">
            点击购买即表示您已阅读并同意
            <a
              href="/agreement/user"
              target="_blank"
              className="ml-1 text-amber-600 hover:text-amber-800"
            >
              《用户协议》
            </a>
            。付费功能与免费功能使用相同的处理引擎，建议先使用免费功能测试效果。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
