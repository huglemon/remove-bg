import { verifyPaymentNotify } from "@/lib/payment-service";
import { redirect } from "next/navigation";

/**
 * 处理Z-Pay支付跳转回调
 */
export async function GET(request) {
  try {
    // 获取所有查询参数
    const url = new URL(request.url);
    const params = {};

    // 转换查询参数为对象
    for (const [key, value] of url.searchParams.entries()) {
      params[key] = value;
    }

    console.log("收到支付跳转通知:", params);

    // 验证通知签名
    const isValid = verifyPaymentNotify(params);

    if (isValid && params.trade_status === "TRADE_SUCCESS") {
      // 验证成功，重定向到支付成功页面
      // 在实际应用中应该重定向到真实的支付成功页面
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/payment/success?orderNo=${params.out_trade_no}&amount=${params.money}`,
        },
      });
    } else {
      // 验证失败，重定向到支付失败页面
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/payment/fail",
        },
      });
    }
  } catch (error) {
    console.error("处理支付跳转异常:", error);
    // 发生异常，重定向到错误页面
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/payment/error",
      },
    });
  }
}
