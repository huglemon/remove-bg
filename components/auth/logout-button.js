'use client';

import { useState } from 'react';
import { logoutUser } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

export function LogoutButton({ variant = 'button', className = '', size = 16, color = 'currentColor' }) {
	const [isLoading, setIsLoading] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const router = useRouter();

	async function handleLogout() {
		setIsLoading(true);
		const result = await logoutUser();
		setIsLoading(false);

		if (result.success) {
			router.push('/auth/login');
		}
	}
	
	function handleClick() {
		setShowConfirm(true);
	}
	
	function handleCancel() {
		setShowConfirm(false);
	}
	
	function handleConfirm() {
		setShowConfirm(false);
		handleLogout();
	}

	// 图标按钮模式
	if (variant === 'icon') {
		return (
			<>
				<Button
					onClick={handleClick}
					disabled={isLoading}
					variant="ghost"
					size="icon"
					title="退出登录"
					className={className}
				>
					<LogOut size={size} color={color} className={isLoading ? 'animate-pulse' : ''} />
				</Button>
				
				<Dialog open={showConfirm} onOpenChange={setShowConfirm}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>确认退出</DialogTitle>
							<DialogDescription>
								您确定要退出登录吗？
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={handleCancel}>取消</Button>
							<Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
								{isLoading ? '退出中...' : '确认退出'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</>
		);
	}

	// 默认按钮模式
	return (
		<>
			<Button 
				variant="destructive" 
				className={className} 
				onClick={handleClick} 
				disabled={isLoading}
			>
				<LogOut size={size} className="mr-2" />
				退出登录
			</Button>
			
			<Dialog open={showConfirm} onOpenChange={setShowConfirm}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>确认退出</DialogTitle>
						<DialogDescription>
							您确定要退出登录吗？
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={handleCancel}>取消</Button>
						<Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
							{isLoading ? '退出中...' : '确认退出'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
