import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SiteConfig } from "@/lib/client";
import Link from "next/link";
import { getCurrentSession } from "@/app/actions/user";
const NavLinksMobile = async () => {
  const session = await getCurrentSession();
  return (
    <div className="flex items-center gap-2 md:hidden">
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
          <DropdownMenuItem>
            {session ? (
              <Link href={"/dashboard"}>个人中心</Link>
            ) : (
              <Link href={"/auth/login"}>登录</Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavLinksMobile;
