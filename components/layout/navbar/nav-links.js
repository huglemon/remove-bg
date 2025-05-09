'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { SiteConfig } from '@/lib/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
	const pathname = usePathname();

	return (
		<div className='hidden md:flex items-center justify-center w-full md:gap-10 text-sm md:text-md'>
			{SiteConfig.navLinks.map((item, index) =>
				item.items ? (
					<DropdownMenu key={index}>
						<DropdownMenuTrigger className='flex items-center gap-2 focus:outline-none focus:ring-0 focus:ring-offset-0'>
							{item.name}
							<ChevronDownIcon className='w-4 h-4' />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{item.items.map((subItem, subIndex) => (
								<DropdownMenuItem key={subIndex}>
									<Link
										href={subItem.url}
										className={pathname === subItem.url ? 'font-bold' : ''}
									>
										{subItem.name}
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Link
						key={index}
						href={item.url}
						className={pathname === item.url ? 'font-bold' : ''}
					>
						{item.name}
					</Link>
				)
			)}
		</div>
	);
};

export default NavLinks;
