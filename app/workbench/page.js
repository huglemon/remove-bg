import { Suspense } from "react";
import { WorkbenchClient } from "@/components/workbench/WorkbenchClient";
import { getCurrentSession } from "@/app/actions/user";
// 服务端组件
export default async function WorkbenchPage({ searchParams }) {
  const imgSrc = searchParams.img || "";
  const imgKey = searchParams.imgKey || "";
  const { session } = await getCurrentSession();
  console.log('session', session)
  let isExpired = true;
  if(session){
    const {expiryDate} = session;
    console.log('expiryDate', expiryDate)
    isExpired = new Date(expiryDate) < new Date();
  }
  console.log('isExpired', isExpired)

  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">加载中...</div>}>
      <WorkbenchClient imgSrc={imgSrc} imgKey={imgKey} isExpired={isExpired} />
    </Suspense>
  );
}