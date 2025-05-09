import { getCurrentSession } from '@/app/actions/user';
import { LogoutButton } from '@/components/auth/logout-button';

export default async function DashboardPage() {
	const { session } = await getCurrentSession();

	return (
		<div className='max-w-4xl mx-auto p-8'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-2xl font-bold'>欢迎，{session.user.name || session.user.email}</h1>
				<LogoutButton />
			</div>
			<div className='bg-white shadow rounded-lg p-6'>
				<h2 className='text-lg font-medium mb-4'>个人信息</h2>
				<p>
					<strong>邮箱:</strong> {session.user.email}
				</p>
				{session.user.name && (
					<p>
						<strong>姓名:</strong> {session.user.name}
					</p>
				)}
			</div>
		</div>
	);
}
