import { getCurrentSession } from "@/app/actions/user";
import { getUserOrders } from "@/app/actions/order";
import { LogoutButton } from "@/components/auth/logout-button";
import { redirect } from "next/navigation";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingDialog from "@/components/payment/pricing-dialog";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { session } = await getCurrentSession();
  console.log("Dashboard 页面获取到的会话:", session);

  // 如果没有会话，重定向到登录页面
  if (!session) {
    redirect("/auth/login");
  }
  const { user, expiryDate } = session;
  console.log("Dashboard 页面用户信息:", user);

  const ordersData = await getUserOrders({ uid: user.id });
  console.log("获取到的订单数据:", ordersData);
  const orders = ordersData.data;

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
                <span className="flex-1">
                  {expiryDate > Date.now() ? "付费用户" : "免费用户"}
                </span>
              </div>
              <PricingDialog uid={user.id}>
                <Button
                  size="sm"
                  className="cursor-pointer bg-amber-500 text-white hover:bg-amber-600"
                >
                  <Crown className="mr-1 h-4 w-4" />
                  <span>升级</span>
                </Button>
              </PricingDialog>
            </div>
            {expiryDate > Date.now() && (
              <p className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <strong className="min-w-24">有效期至:</strong>
                <span className="flex-1">
                  {new Date(expiryDate).toLocaleDateString("zh-CN")}
                </span>
              </p>
            )}
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
            {orders.length === 0 ? (
              <p className="py-4 text-center text-sm text-gray-500">
                暂无活动记录
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between rounded px-2 py-3 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-medium">{order.subject}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`mt-1 w-fit rounded-full px-2 py-1 text-xs sm:mt-0 ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="whitespace-nowrap text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
