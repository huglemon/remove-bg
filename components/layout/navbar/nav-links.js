"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { SiteConfig } from "@/lib/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="md:text-md hidden w-full items-center justify-center text-sm md:flex md:gap-10">
      {SiteConfig.navLinks.map((item, index) =>
        item.items ? (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none focus:ring-0 focus:ring-offset-0">
              {item.name}
              <ChevronDownIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {item.items.map((subItem, subIndex) => (
                <DropdownMenuItem key={subIndex}>
                  <Link
                    href={subItem.url}
                    className={pathname === subItem.url ? "font-bold" : ""}
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
            className={`flex items-center gap-2 ${
              pathname === item.url && "font-bold"
            }`}
          >
            {item.icon && <item.icon className="h-4 w-4 text-amber-500" />}
            {item.name}
          </Link>
        ),
      )}
    </div>
  );
};

export default NavLinks;
