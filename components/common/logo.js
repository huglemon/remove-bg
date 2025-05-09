import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
const Logo = ({
  href = "/",
  showText = true,
  showIcon = true,
  iconClassName = "w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-foreground",
  textClassName = "text-lg md:text-2xl font-smiley",
}) => {
  return (
    <Link title="logo" href={href}>
      <div className="inline-flex min-w-[200px] items-center justify-start gap-1 md:gap-2">
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          className={cn(iconClassName)}
        />
        {showText && (
          <div className={`${textClassName} flex items-baseline !leading-[1]`}>
            乘风智能抠图
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
