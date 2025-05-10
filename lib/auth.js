import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MongoClient, ObjectId } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { customSession, captcha } from "better-auth/plugins";

// 创建 MongoDB 客户端和数据库实例
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB_NAME);

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  secret: process.env.AUTH_SECRET,
  routes: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
  },
  emailAndPassword: {
    enabled: true,
  },
  // 启用需要的认证特性
  features: {
    signUpEmail: true, // 启用邮箱注册
    signInEmail: true, // 启用邮箱登录
    emailVerification: false, // 是否需要邮箱验证
    passwordResetFlow: false, // 是否需要密码重置流程
  },
  providers: [
    // 配置邮箱密码认证
    {
      type: "email",
      name: "email",
    },
  ],
  database: mongodbAdapter(db),
  // 其他配置...
  plugins: [
    nextCookies(),
    captcha({
      provider: "hcaptcha",
      secretKey: process.env.HCAPTCHA_SECRET_KEY,
      siteKey: process.env.HCAPTCHA_SITE_KEY,
      endpoints: ["/auth/login", "/auth/register"], // 指定需要验证码验证的端点
    }),
    customSession(async ({ user, session }) => {
      // 不应该出现的情况，但为了安全检查一下
      if (!user || !user.id) {
        console.error("无效的用户数据");
        return { user, session, expiryDate: 0 };
      }

      try {
        // 尝试将字符串ID转换为ObjectId
        const objectId = new ObjectId(user.id);

        // 查询用户数据
        const userData = await db.collection("user").findOne({ _id: objectId });

        // 安全地访问expiryDate
        const expiryDate = userData?.expiryDate || 0;

        return {
          user,
          session,
          expiryDate,
        };
      } catch (error) {
        // 根据错误类型提供不同处理
        if (error instanceof TypeError) {
          console.error("ID格式转换错误:", error.message);
        } else if (error.name === "MongoNetworkError") {
          console.error("MongoDB网络连接错误:", error.message);
        } else {
          console.error("获取用户过期时间失败:", error.message);
        }

        // 返回默认会话数据
        return { user, session, expiryDate: 0 };
      }
    }),
  ],
});
