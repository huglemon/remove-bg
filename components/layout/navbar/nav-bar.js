import Logo from '@/components/common/logo';
import NavLinks from '@/components/layout/navbar/nav-links';
import NavLinksMobile from '@/components/layout/navbar/nav-links-mobile';
import NavbarBtn from '@/components/layout/navbar/nav-bar-btn';
const Navbar = ({ fullWidth = false, showLinks = true, showDashboard = true }) => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border bg-background/50">
      <div
        className={` flex justify-between items-center p-4 mx-auto ${
          fullWidth ? "w-full" : "container"
        }`}
      >
        <Logo />
				<div className='w-6/12 flex justify-center'>{showLinks && <NavLinks />}</div>
				<div className='w-2/12 flex justify-end items-center gap-3'>
					{showDashboard && <NavbarBtn />}
					{showLinks && <NavLinksMobile />}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
