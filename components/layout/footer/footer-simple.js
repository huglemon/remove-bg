import Logo from '@/components/common/logo';
import Link from 'next/link';
import { SiteConfig } from '@/lib/client';
const SimpleFooter = () => {
	return (
		<div className='w-full border-t border-border/40 dark:border-border'>
			<div className='container mx-auto flex flex-col items-center justify-center gap-y-3 p-4'>
				<Logo />
				<div className='inline-flex flex-col md:flex-row items-center gap-x-2 text-xs font-light'>
					<div>
						©2024{' '}
						<Link
							title='huglemon'
							href='https://www.huglemon.com'
						>
							huglemon
						</Link>{' '}
						present.
					</div>
					<div className='flex items-center gap-x-2'>
						<span className='md:block hidden text-muted-foreground/30'>|</span>
						<Link
							title='huglemon'
							href='/legal/privacy'
						>
							Privacy Policy
						</Link>{' '}
						<span className='text-muted-foreground/30'>|</span>
						<Link
							title='huglemon'
							href='/legal/terms'
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SimpleFooter;
