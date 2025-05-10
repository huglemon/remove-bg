import Logo from "@/components/common/logo";
import FooterLinks from "@/components/layout/footer/footer-links";
import { SiteConfig } from "@/lib/client";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="w-full border-t border-border bg-background/50">
      <div className="container mx-auto grid grid-cols-1 gap-5 p-4 py-5 md:grid-cols-2 md:py-10">
        <div className="flex flex-col items-center justify-between gap-2 md:items-start md:gap-4">
          <div className="flex flex-col items-start gap-2">
            <Logo />
          </div>
          <p className="lg:text-md text-xs md:text-sm">
            <Link href="https://www.huglemon.com">
              ©2024 huglemon present.
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <FooterLinks
            title="关于我们"
            links={SiteConfig.aboutLinks.slice(0, 5)}
          />
          <FooterLinks
            title="乘风出海"
            links={SiteConfig.inwindLinks.slice(0, 5)}
          />
          <FooterLinks
            title="友情链接"
            links={SiteConfig.friendLinks.slice(0, 5)}
          />
          <FooterLinks title="外贸工具" links={SiteConfig.toolsLinks} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
