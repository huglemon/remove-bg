'use client';

import { useState, useRef } from 'react';
import { registerUser } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [captchaToken, setCaptchaToken] = useState('');
	const captchaRef = useRef(null);
	const router = useRouter();

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);
		setError('');

		console.log('当前验证码token:', captchaToken);

		if (!captchaToken) {
			setError('请完成验证码验证');
			setIsLoading(false);
			return;
		}

		const formData = new FormData(event.target);
		formData.append('captchaToken', captchaToken);
		
		console.log('提交的表单数据:', {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
			captchaToken: formData.get('captchaToken')
		});

		const result = await registerUser(formData);
		console.log('注册结果:', result);

		setIsLoading(false);

		if (result.success) {
			router.push('/dashboard');
		} else {
			setError(result.error);
			captchaRef.current?.resetCaptcha();
			setCaptchaToken('');
		}
	}

	const onCaptchaChange = (token) => {
		console.log('验证码token:', token);
		if (token) {
			setCaptchaToken(token);
			setError('');
		}
	};

	const onCaptchaExpire = () => {
		console.log('验证码已过期');
		setCaptchaToken('');
		setError('验证码已过期，请重新验证');
	};

	const onCaptchaError = (error) => {
		console.log('验证码错误:', error);
		setCaptchaToken('');
		setError('验证码加载失败，请刷新页面重试');
	};

	return (
		<form
			className='space-y-6 bg-white p-8 rounded-lg shadow-md'
			onSubmit={handleSubmit}
		>
			{error && <div className='bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded'>{error}</div>}

			<div>
				<label
					htmlFor='name'
					className='block text-sm font-medium'
				>
					姓名
				</label>
				<input
					id='name'
					name='name'
					type='text'
					required
					className='mt-1 block w-full rounded-md border p-2'
				/>
			</div>

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

			<div className="flex justify-center">
				<HCaptcha
					ref={captchaRef}
					sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
					onChange={onCaptchaChange}
					onExpire={onCaptchaExpire}
					onError={onCaptchaError}
					onLoad={() => console.log('验证码组件加载完成')}
					theme="light"
					size="normal"
					tabindex={0}
					languageOverride="zh"
					reCaptchaCompat={false}
					onVerify={(token) => {
						console.log('验证完成，token:', token);
						if (token) {
							setCaptchaToken(token);
							setError('');
						}
					}}
				/>
			</div>

			<div>
				<button
					type='submit'
					disabled={isLoading}
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
				>
					{isLoading ? '注册中...' : '注册'}
				</button>
			</div>

			<div className='text-sm text-center'>
				已有账户？
				<Link
					href='/auth/login'
					className='font-medium text-blue-600 hover:text-blue-500 ml-1'
				>
					登录
				</Link>
			</div>
		</form>
	);
}
