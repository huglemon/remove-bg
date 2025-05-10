import { BatchHeader } from "@/components/batch/BatchHeader";
import { BatchProcessor } from "@/components/batch/BatchProcessor";
import { getCurrentSession } from "@/app/actions/user";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BatchPage() {
  // 获取用户会话
  const { session } = await getCurrentSession();

  // 如果用户未登录，可以选择重定向到登录页面
  if (!session) {
    redirect("/auth/login");
  }

  const { expiryDate } = session;
  console.log("expiryDate", expiryDate);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 pb-32">
      <BatchHeader />
      <BatchProcessor expiryDate={expiryDate} />
    </div>
  );
}
