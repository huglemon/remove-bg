import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

// 创建 MongoDB 客户端和数据库实例
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB_NAME);

export const auth = betterAuth({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
	secret: process.env.AUTH_SECRET,
	routes: {
		signIn: '/auth/login',
		signUp: '/auth/register',
		afterSignIn: '/dashboard',
		afterSignUp: '/dashboard',
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
			type: 'email',
			name: 'email',
		}
	],
	database: mongodbAdapter(db),
	plugins: [nextCookies()],
});
