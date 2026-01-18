"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { queryOrderStatus, createPaymentForm } from "@/lib/payment-service";
import { createOrder } from "@/app/actions/order";

export function PaymentButton({ uid, subject = "测试商品", amount = 990 }) {
  // 验证输入参数是否有效
  const isValidAmount = amount === 1 || amount === 990 || amount === 6600 || amount === 19900;
  const isValid = uid && isValidAmount;
  
  const [loading, setLoading] = useState(false);
  const [orderNo, setOrderNo] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [polling, setPolling] = useState(false);

  // 轮询检查支付状态
  useEffect(() => {
    let timer;
    if (polling && orderNo) {
      timer = setInterval(async () => {
        const result = await queryOrderStatus(orderNo);
        if (result.success && result.data.payStatus === "PAY_SUCCEED") {
          setPaymentStatus("支付成功");
          setPolling(false);
          setLoading(false);
        }
      }, 3000); // 每3秒查询一次
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [polling, orderNo]);

  // 表单提交方式支付
  const handlePayment = async () => {
    try {
      setLoading(true);

      // 生成唯一订单号
      const mchtOrderNo = `ORDER${Date.now()}`;

      // 创建订单参数
      const orderData = {
        mchtOrderNo,
        paymentAmount: amount,
        subject,
        payType: "wxpay", // 微信支付
      };

      const orderResult = await createOrder({
        uid,
        amount,
        subject,
        orderNo: mchtOrderNo,
        payType: "wxpay",
      });

      if (!orderResult?.success) {
        throw new Error(orderResult?.error || "订单创建失败");
      }

      // 获取表单提交数据
      const formData = createPaymentForm(orderData);

      // 创建表单并提交
      const form = document.createElement("form");
      form.method = "POST";
      form.action = formData.apiUrl;
      form.target = "_blank"; // 新窗口打开

      Object.keys(formData.formData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = formData.formData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // 保存订单号用于后续查询
      setOrderNo(mchtOrderNo);
      setPaymentStatus("已打开支付页面，请在新窗口完成支付");
      setPolling(true);
    } catch (error) {
      console.error("创建支付表单失败:", error);
      setPaymentStatus("支付失败: " + error.message);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLoading(false);
    setOrderNo(null);
    setPaymentStatus(null);
    setPolling(false);
  };

  // 如果参数无效，则不渲染任何内容
  if (!isValid) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!paymentStatus?.includes("成功") &&
        !paymentStatus?.includes("已打开") && (
          <Button
            onClick={handlePayment}
            disabled={loading}
            className="bg-green-500 px-8 hover:bg-green-600"
          >
            {loading ? "处理中..." : `微信支付 ¥${amount / 100}`}
          </Button>
        )}

      {paymentStatus && (
        <div
          className={`text-sm ${
            paymentStatus.includes("成功")
              ? "text-green-500"
              : paymentStatus.includes("失败")
                ? "text-red-500"
                : "text-gray-500"
          }`}
        >
          {paymentStatus}
        </div>
      )}

      {(paymentStatus?.includes("成功") ||
        paymentStatus?.includes("已打开")) && (
        <Button onClick={handleReset} variant="outline" className="mt-2">
          重新支付
        </Button>
      )}
    </div>
  );
}
