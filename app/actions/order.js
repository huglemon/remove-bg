"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";

// 创建 MongoDB 客户端和数据库实例
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB_NAME);

// 连接管理函数
async function connectToDatabase() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    return { client, db };
  } catch (error) {
    throw new Error(`数据库连接失败: ${error.message}`);
  }
}

export async function createOrder({ uid, amount, subject, orderNo, payType }) {
  console.log(uid, amount, subject, orderNo, payType);
  try {
    // 验证必要参数
    if (!uid) return { success: false, error: "用户ID不能为空" };
    if (!amount || amount <= 0)
      return { success: false, error: "订单金额无效" };
    if (!subject) return { success: false, error: "订单主题不能为空" };
    if (!orderNo) return { success: false, error: "订单号不能为空" };
    if (!payType) return { success: false, error: "支付类型不能为空" };

    // 验证用户会话
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, error: "用户未登录" };
    }

    const { user } = session;
    if (user.id !== uid) {
      return { success: false, error: "用户状态异常" };
    }

    // 连接数据库
    const { db } = await connectToDatabase();

    // 创建订单记录
    const orderData = {
      uid: user.id,
      amount,
      subject,
      orderNo,
      payType,
      status: "pending", // 添加订单状态
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(orderData);

    if (!result.acknowledged) {
      return { success: false, error: "订单创建失败" };
    }

    return {
      success: true,
      data: {
        id: result.insertedId,
        ...orderData,
      },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateOrderStatus({ orderNo, status }) {
  const { db } = await connectToDatabase();
  await db.collection("orders").updateOne({ orderNo }, { $set: { status } });
}

export async function getOrder(orderNo) {
  const { db } = await connectToDatabase();
  const order = await db.collection("orders").findOne({ orderNo });
  return order;
}

export async function getUserOrders({ uid }) {
  try {
    console.log('getUserOrders 接收到的 uid:', uid)
    
    if (!uid) return { success: false, error: "用户ID不能为空" }

    // 验证用户会话
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    console.log('当前会话:', session)

    if (!session || !session.user) {
      return { success: false, error: "用户未登录" }
    }

    const { user } = session
    console.log('会话中的用户:', user)
    
    if (user.id !== uid) {
      return { success: false, error: "用户状态异常" }
    }

    const { db } = await connectToDatabase()
    const orders = await db.collection("orders")
      .find({ uid })
      .sort({ createdAt: -1 })
      .toArray()

    console.log('查询到的订单:', orders)

    return {
      success: true,
      data: orders
    }
  } catch (error) {
    console.error('获取订单列表失败:', error)
    return { success: false, error: error.message }
  }
}
