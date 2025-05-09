import { MenuIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { SiteConfig } from '@/lib/client';
import Link from 'next/link';
const NavLinksMobile = () => {
	return (
		<div className='flex md:hidden items-center gap-2'>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<MenuIcon size={20} />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{SiteConfig.navLinks.map((link, index) => (
						<DropdownMenuItem key={index}>
							<Link href={link.url}>{link.name}</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default NavLinksMobile;
