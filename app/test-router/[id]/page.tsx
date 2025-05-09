"use client";

import { useParams } from "next/navigation";

export default function TestRouterPage() {
  const params = useParams();
  
  return (
    <div>
      <h1>测试路由页面</h1>
      <p>参数ID: {params.id}</p>
    </div>
  );
} 