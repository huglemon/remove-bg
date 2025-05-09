'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// 注册用户
export async function registerUser(formData) {
	const email = formData.get('email');
	const password = formData.get('password');
	const name = formData.get('name');

	try {
		const result = await auth.api.signUpEmail({
			body: {
				email,
				password,
				userData: { name },
			},
		});
		return { success: true, data: result };
	} catch (error) {
		return {
			success: false,
			error: error.message || '注册失败，请重试',
		};
	}
}

// 用户登录
export async function loginUser(formData) {
	const email = formData.get('email');
	const password = formData.get('password');

	try {
		const result = await auth.api.signInEmail({
			body: {
				email,
				password,
			},
		});
		return { success: true, data: result };
	} catch (error) {
		return {
			success: false,
			error: error.message || '登录失败，请检查邮箱和密码',
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
		return { success: false, error: error.message };
	}
}
