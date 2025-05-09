'use client';

import { useState } from 'react';
import { logoutUser } from '@/app/actions/user';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function handleLogout() {
		setIsLoading(true);
		const result = await logoutUser();
		setIsLoading(false);

		if (result.success) {
			router.push('/auth/login');
		}
	}

	return (
		<button
			onClick={handleLogout}
			disabled={isLoading}
			className='py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
		>
			{isLoading ? '退出中...' : '退出登录'}
		</button>
	);
}
