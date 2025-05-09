import { LoginForm } from "@/components/auth/login-form";
import { getCurrentSession } from "@/app/actions/user";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // 检查用户是否已登录
  const { session } = await getCurrentSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            登录您的账户
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
