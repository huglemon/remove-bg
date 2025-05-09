import { createOrder } from "@/app/actions/order";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { uid, amount, subject, orderNo, payType } = await request.json();

  const order = await createOrder(uid, amount, subject, orderNo, payType);

  if (order.success) {
    return NextResponse.json(order.data);
  } else {
    return NextResponse.json({ error: order.error }, { status: 500 });
  }
}
