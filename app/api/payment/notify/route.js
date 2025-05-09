import { getOrder, updateOrderStatus } from "@/app/actions/order";
import { verifyPaymentNotify } from "@/lib/payment-service";
import { extendMemberExpiryDate } from "@/app/actions/user";

export const dynamic = 'force-dynamic';

/**
 * 处理Z-Pay支付异步通知
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

    console.log("收到支付通知:", params);

    // 验证通知签名
    const isValid = verifyPaymentNotify(params);

    if (isValid && params.trade_status === "TRADE_SUCCESS") {
      // 验证成功，处理支付成功逻辑
      // 实际项目中，可以在这里更新订单状态，发送邮件等

      const order = await getOrder(params.out_trade_no);

      if (!order) {
        return new Response("error", {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      if (order.amount !== parseFloat(params.money) * 100) {
        return new Response("error", {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      if (
        parseFloat(params.money) * 100 !== 1 &&
        parseFloat(params.money) * 100 !== 990 &&
        parseFloat(params.money) * 100 !== 6600
      ) {
        return new Response("error", {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      if (
        parseFloat(params.money) * 100 === 1 ||
        parseFloat(params.money) * 100 === 990
      ) {
        // 月付会员，延长30天有效期
        await extendMemberExpiryDate(order.uid, 30);
      }

      if (parseFloat(params.money) * 100 === 6600) {
        // 年付会员，延长365天有效期
        await extendMemberExpiryDate(order.uid, 365);
      }

      await updateOrderStatus(order.out_trade_no, "paid");

      // 保存支付信息到日志
      console.log("支付成功:", {
        orderNo: params.out_trade_no,
        tradeNo: params.trade_no,
        amount: params.money, // 单位:元
        payTime: new Date().toISOString(),
      });

      // 返回成功信息，必须返回纯文本"success"
      return new Response("success", {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } else {
      // 验证失败
      console.error("支付通知验证失败:", params);
      return new Response("fail", {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  } catch (error) {
    console.error("处理支付通知异常:", error);
    return new Response("error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

// POST方法也处理同样的逻辑
export async function POST(request) {
  try {
    // 获取POST请求体
    const formData = await request.formData();
    const params = {};

    // 转换表单数据为对象
    for (const [key, value] of formData.entries()) {
      params[key] = value;
    }

    console.log("收到POST支付通知:", params);

    // 验证通知签名
    const isValid = verifyPaymentNotify(params);

    if (isValid && params.trade_status === "TRADE_SUCCESS") {
      // 验证成功，处理支付成功逻辑
      console.log("支付成功:", {
        orderNo: params.out_trade_no,
        tradeNo: params.trade_no,
        amount: params.money, // 单位:元
        payTime: new Date().toISOString(),
      });

      // 返回成功信息
      return new Response("success", {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } else {
      // 验证失败
      console.error("支付通知验证失败:", params);
      return new Response("fail", {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  } catch (error) {
    console.error("处理支付POST通知异常:", error);
    return new Response("error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
