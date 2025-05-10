"use client";

import { useState, useRef } from "react";
import { loginUser } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef(null);
  const router = useRouter();

  // 检查环境变量
  console.log('HCaptcha Site Key:', process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    console.log('当前验证码token:', captchaToken);

    if (!captchaToken) {
      setError("请完成验证码验证");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.target);
    formData.append("captchaToken", captchaToken);
    
    console.log('提交的表单数据:', {
      email: formData.get('email'),
      password: formData.get('password'),
      captchaToken: formData.get('captchaToken')
    });

    const result = await loginUser(formData);
    console.log('登录结果:', result);

    setIsLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error);
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
    }
  }

  const onCaptchaChange = (token) => {
    console.log('验证码token:', token);
    if (token) {
      setCaptchaToken(token);
      setError("");
    }
  };

  const onCaptchaExpire = () => {
    console.log('验证码已过期');
    setCaptchaToken("");
    setError("验证码已过期，请重新验证");
  };

  const onCaptchaError = (error) => {
    console.log('验证码错误:', error);
    setCaptchaToken("");
    setError("验证码加载失败，请刷新页面重试");
  };

  return (
    <form
      className="space-y-6 rounded-lg bg-white p-8 shadow-md"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          邮箱
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      <div className="flex justify-center">
        <HCaptcha
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          onChange={onCaptchaChange}
          onExpire={onCaptchaExpire}
          onError={onCaptchaError}
          onLoad={() => console.log('验证码组件加载完成')}
          theme="light"
          size="normal"
          tabindex={0}
          languageOverride="zh"
          reCaptchaCompat={false}
          onVerify={(token) => {
            console.log('验证完成，token:', token);
            if (token) {
              setCaptchaToken(token);
              setError("");
            }
          }}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "登录中..." : "登录"}
        </button>
      </div>

      <div className="text-center text-sm">
        没有账户？
        <Link
          href="/auth/register"
          className="ml-1 font-medium text-blue-600 hover:text-blue-500"
        >
          注册
        </Link>
      </div>
    </form>
  );
}
