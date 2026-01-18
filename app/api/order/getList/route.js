import { NextResponse } from "next/server";
import { getUserOrders } from "@/app/actions/order";
import { getCurrentSession } from "@/app/actions/user";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { session } = await getCurrentSession();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "未登录" }, { status: 401 });
    }

    const result = await getUserOrders({ uid: session.user.id });

    if (!result?.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("获取订单列表接口异常:", error);
    return NextResponse.json(
      { success: false, error: "服务器错误" },
      { status: 500 },
    );
  }
}
