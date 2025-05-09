import Link from 'next/link';
const NavLinks = ({ links = [], title = '' }) => {
	return (
		<div className='flex flex-col items-start gap-2 md:gap-5 text-sm md:text-md'>
			<p className='font-bold'>{title}</p>
			{links.length > 0 &&
				links?.map((link, index) => (
					<Link
						href={link.url}
						key={index}
					>
						{link.name}
					</Link>
				))}
		</div>
	);
};

export default NavLinks;
