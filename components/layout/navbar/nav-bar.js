import Logo from "@/components/common/logo";
import NavLinks from "@/components/layout/navbar/nav-links";
import NavLinksMobile from "@/components/layout/navbar/nav-links-mobile";
import NavbarBtn from "@/components/layout/navbar/nav-bar-btn";
const Navbar = ({
  fullWidth = false,
  showLinks = true,
  showDashboard = true,
}) => {
  return (
    <div className="sticky top-0 z-50 w-full border-b border-border bg-background/50">
      <div
        className={`mx-auto flex items-center justify-between p-4 ${
          fullWidth ? "w-full" : "container"
        }`}
      >
        <div className="flex w-6/12 sm:w-2/12">
          <Logo />
        </div>
        <div className="flex w-6/12 justify-center">
          {showLinks && <NavLinks />}
        </div>
        <div className="flex w-6/12 items-center justify-end gap-3 md:w-2/12">
          {showDashboard && <NavbarBtn />}
          {showLinks && <NavLinksMobile />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
