import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PaymentButton } from "@/components/payment/payment-button";
import { getCurrentSession } from "@/app/actions/user";
import { Crown } from "lucide-react";

const pricingPlans = [
  {
    title: "单图抠图",
    price: "¥0",
    period: "/永久",
    features: ["单图抠图", "永久免费", "无需登录"],
    amount: 0,
    subject: "单图抠图",
  },
  {
    title: "月度套餐",
    price: "¥9.9",
    period: "/月",
    features: ["批量抠图无限次", "有效期30天", "优先客服支持"],
    amount: 990,
    subject: "乘风智能修图30天VIP",
  },
  {
    title: "年度套餐",
    price: "¥66",
    period: "/年",
    features: [
      "批量抠图无限次",
      "有效期365天",
      "高级编辑无水印",
      "专属客服通道",
    ],
    amount: 6600,
    subject: "乘风智能修图365天VIP",
  },
  {
    title: "终身套餐",
    price: "¥199",
    period: "/终身",
    features: [
      "批量抠图无限次",
      "有效期100年",
      "高级编辑无水印",
      "专属客服通道",
    ],
    amount: 19900,
    subject: "乘风智能修图终身VIP",
  },
];

export default async function Pricing() {
  const { session } = await getCurrentSession();
  const uid = session?.user?.id;

  return (
    <section id="price" className="w-full bg-gray-50/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-smiley text-4xl font-bold text-gray-900">
            价格
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            仅对批量抠图功能收费，单图抠图功能永久免费
          </p>
        </div>

        <div className="mx-auto grid grid-cols-2 gap-8 md:grid-cols-4">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-gray-500">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex min-h-60 flex-col justify-between">
                <ul className="mb-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-amber-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.amount > 0 &&
                  (uid ? (
                    <PaymentButton
                      uid={uid}
                      amount={plan.amount}
                      subject={plan.subject}
                    />
                  ) : (
                    <Button variant="outline" className="w-full">
                      <Crown className="mr-2 h-4 w-4 text-amber-500" />
                      <Link href="/auth/login">登录升级</Link>
                    </Button>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
