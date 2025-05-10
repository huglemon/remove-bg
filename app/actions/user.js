"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";

// 创建 MongoDB 客户端和数据库实例
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB_NAME);

// 连接管理函数
async function connectToDatabase() {
  try {
    // 检查MongoDB连接状态
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    return { client, db };
  } catch (error) {
    console.error("数据库连接失败:", error);
    throw new Error(`数据库连接失败: ${error.message}`);
  }
}

// 安全地将ID转换为ObjectId
function safeObjectId(id) {
  if (!id) return null;
  try {
    return new ObjectId(id);
  } catch (error) {
    console.error("无效的ObjectId格式:", error.message);
    return null;
  }
}

// 注册用户
export async function registerUser(formData) {
  // 验证输入
  const email = formData.get("email")?.trim();
  const password = formData.get("password");
  const name = formData.get("name")?.trim();
  const captchaToken = formData.get("captchaToken");

  if (!email || !password) {
    return { success: false, error: "邮箱和密码不能为空" };
  }

  if (!captchaToken) {
    return { success: false, error: "请完成验证码验证" };
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        userData: { name },
      },
      headers: {
        "x-captcha-response": captchaToken,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("注册失败:", error);
    return {
      success: false,
      error: error.message || "注册失败，请重试",
    };
  }
}

// 用户登录
export async function loginUser(formData) {
  // 验证输入
  const email = formData.get("email")?.trim();
  const password = formData.get("password");
  const captchaToken = formData.get("captchaToken");

  if (!email || !password) {
    return { success: false, error: "邮箱和密码不能为空" };
  }

  if (!captchaToken) {
    return { success: false, error: "请完成验证码验证" };
  }

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: {
        "x-captcha-response": captchaToken,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("登录失败:", error);
    return {
      success: false,
      error: error.message || "登录失败，请检查邮箱和密码",
    };
  }
}

// 获取当前会话
export async function getCurrentSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return { session };
  } catch (error) {
    console.error("获取会话失败:", error);
    return { session: null };
  }
}

// 退出登录
export async function logoutUser() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    return { success: true };
  } catch (error) {
    console.error("退出登录失败:", error);
    return { success: false, error: error.message };
  }
}

// 延长会员有效期
export async function extendMemberExpiryDate(uid, days = 30) {
  // 验证输入
  if (!uid) {
    return { success: false, error: "用户ID不能为空" };
  }

  if (!days || days <= 0) {
    return { success: false, error: "延长天数必须大于0" };
  }

  try {
    const { db } = await connectToDatabase();

    // 构建查询条件
    let query = {};
    const objectId = safeObjectId(uid);

    if (objectId) {
      query = { _id: objectId };
    } else {
      // 如果不是有效的ObjectId，使用uid作为字符串查询
      query = { uid };
    }

    // 查询用户
    const user = await db.collection("user").findOne(query);

    if (!user) {
      return { success: false, error: "用户不存在" };
    }

    // 计算新的过期日期
    let newExpiryDate;
    if (user.expiryDate) {
      // 如果已有过期日期，则在此基础上延长
      newExpiryDate = new Date(user.expiryDate);
      newExpiryDate.setDate(newExpiryDate.getDate() + days);
    } else {
      // 如果没有过期日期，则从当前时间开始计算
      newExpiryDate = new Date(
        new Date().getTime() + days * 24 * 60 * 60 * 1000,
      );
    }

    // 更新用户数据
    const updateResult = await db
      .collection("user")
      .updateOne(query, { $set: { expiryDate: newExpiryDate } });

    if (updateResult.matchedCount === 0) {
      return { success: false, error: "用户更新失败" };
    }

    return {
      success: true,
      data: { expiryDate: newExpiryDate },
    };
  } catch (error) {
    console.error("延长会员有效期失败:", error);
    return { success: false, error: error.message || "操作失败" };
  }
}

// 查询会员有效期
export async function getMemberExpiryDate(uid) {
  // 验证输入
  if (!uid) {
    console.error("查询会员有效期: 用户ID为空");
    return null;
  }

  try {
    const { db } = await connectToDatabase();

    // 构建查询条件
    let query = {};
    const objectId = safeObjectId(uid);

    if (objectId) {
      query = { _id: objectId };
    } else {
      // 如果不是有效的ObjectId，使用uid作为字符串查询
      query = { uid };
    }

    // 查询用户
    const user = await db.collection("user").findOne(query);

    // 安全访问expiryDate
    return user?.expiryDate || null;
  } catch (error) {
    console.error("查询会员有效期失败:", error);
    return null;
  }
}
