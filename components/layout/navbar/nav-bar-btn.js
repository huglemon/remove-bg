import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/app/actions/user";
import Link from "next/link";

const NavbarBtn = async () => {
  const { session } = await getCurrentSession();

  return (
    <Button size="sm">
      {session ? (
        <Link href="/dashboard" className="flex items-center gap-2 text-xs">
          个人中心
        </Link>
      ) : (
        <Link href="/auth/login" className="text-xs">
          登录
        </Link>
      )}
    </Button>
  );
};

export default NavbarBtn;
