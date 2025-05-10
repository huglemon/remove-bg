'use client';

import { useState } from 'react';
import { loginUser } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		setError('');

		const formData = new FormData(event.target);
		const result = await loginUser(formData);

		setIsLoading(false);

		if (result.success) {
			router.push('/dashboard');
		} else {
			setError(result.error);
		}
	}

	return (
		<form
			className='space-y-6 bg-white p-8 rounded-lg shadow-md'
			onSubmit={handleSubmit}
		>
			{error && <div className='bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded'>{error}</div>}

			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium'
				>
					邮箱
				</label>
				<input
					id='email'
					name='email'
					type='email'
					required
					className='mt-1 block w-full rounded-md border p-2'
				/>
			</div>

			<div>
				<label
					htmlFor='password'
					className='block text-sm font-medium'
				>
					密码
				</label>
				<input
					id='password'
					name='password'
					type='password'
					required
					className='mt-1 block w-full rounded-md border p-2'
				/>
			</div>

			<div>
				<button
					type='submit'
					disabled={isLoading}
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
				>
					{isLoading ? '登录中...' : '登录'}
				</button>
			</div>

			<div className='text-sm text-center'>
				没有账户？
				<Link
					href='/auth/register'
					className='font-medium text-blue-600 hover:text-blue-500 ml-1'
				>
					注册
				</Link>
			</div>
		</form>
	);
}
