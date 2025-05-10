import { RegisterForm } from '@/components/auth/register-form';
import { getCurrentSession } from '@/app/actions/user';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
	// 检查用户是否已登录
	const { session } = await getCurrentSession();

	if (session) {
		redirect('/dashboard');
	}

	return (
		<div className='flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='w-full max-w-md space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-5xl font-bold tracking-tight font-smiley'>创建新账户</h2>
				</div>
				<RegisterForm />
			</div>
		</div>
	);
}
