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
import Pricing from "@/components/landing/pricing";

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
        <Pricing />
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
