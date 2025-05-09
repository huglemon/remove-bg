import { getCurrentSession } from "@/app/actions/user";
import { LogoutButton } from "@/components/auth/logout-button";
import { PaymentButton } from "@/components/payment/payment-button";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { session } = await getCurrentSession();

  // 如果没有会话，重定向到登录页面
  if (!session) {
    redirect("/auth/login");
  }
  console.log(session);
  const { user } = session;

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-smiley text-4xl font-bold">个人中心</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">个人信息</h2>
            <LogoutButton variant="icon" />
          </div>
          <div className="space-y-3">
            <p className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <strong className="min-w-24">用户名:</strong>
              <span className="flex-1">{user.name || user.email}</span>
            </p>
            <p className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <strong className="min-w-24">邮箱:</strong>
              <span className="flex-1">{user.email}</span>
            </p>
            {session.user.name && (
              <p className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <strong className="min-w-24">姓名:</strong>
                <span className="flex-1">{session.user.name}</span>
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-bold">账户统计</h2>
          <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <strong className="min-w-24">账户等级:</strong>
                <span className="flex-1">免费用户</span>
              </div>
              <PaymentButton uid={user.id} />
              {/* <Button size="sm" className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white">
                <Crown className="mr-1 h-4 w-4" />
                <span>升级</span>
              </Button> */}
            </div>
            <p className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <strong className="min-w-24">注册日期:</strong>
              <span className="flex-1">
                {new Date(user.createdAt).toLocaleDateString("zh-CN")}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow md:col-span-2">
          <h2 className="mb-4 text-lg font-bold">最近活动</h2>
          <div className="space-y-2">
            <p className="text-sm">暂无最近活动记录</p>
          </div>
        </div>
      </div>
    </div>
  );
}
