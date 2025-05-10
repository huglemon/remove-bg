"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const backgroundColors = [
  // 透明/马赛克
  {
    key: "transparent",
    className:
      "border-2 border-blue-400 bg-[linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea),linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea)] bg-[length:30px_30px] bg-[position:0_0,15px_15px] text-gray-900 antialiased",
    bg:
      "bg-[linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea),linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea)] bg-[length:30px_30px] bg-[position:0_0,15px_15px] text-gray-900 antialiased",
    label: "",
  },
  // 纯色
  { key: "white", className: "border border-gray-200 bg-white", bg: "bg-white", label: "" },
  { key: "black", className: "border border-gray-200 bg-black", bg: "bg-black", label: "" },
  { key: "gray", className: "border border-gray-200 bg-gray-300", bg: "bg-gray-300", label: "" },
  { key: "gray-dark", className: "border border-gray-200 bg-gray-700", bg: "bg-gray-700", label: "" },
  { key: "red", className: "border border-gray-200 bg-red-500", bg: "bg-red-500", label: "" },
  { key: "orange", className: "border border-gray-200 bg-orange-400", bg: "bg-orange-400", label: "" },
  { key: "yellow", className: "border border-gray-200 bg-yellow-300", bg: "bg-yellow-300", label: "" },
  { key: "green", className: "border border-gray-200 bg-green-400", bg: "bg-green-400", label: "" },
  { key: "teal", className: "border border-gray-200 bg-teal-400", bg: "bg-teal-400", label: "" },
  { key: "blue", className: "border border-gray-200 bg-blue-500", bg: "bg-blue-500", label: "" },
  { key: "indigo", className: "border border-gray-200 bg-indigo-400", bg: "bg-indigo-400", label: "" },
  { key: "purple", className: "border border-gray-200 bg-purple-400", bg: "bg-purple-400", label: "" },
  { key: "pink", className: "border border-gray-200 bg-pink-400", bg: "bg-pink-400", label: "" },
  // 渐变
  { key: "gradient1", className: "border-2 border-blue-400 bg-gradient-to-tr from-pink-400 to-yellow-300", bg: "bg-gradient-to-tr from-pink-400 to-yellow-300", label: "" },
  { key: "gradient2", className: "border border-gray-200 bg-gradient-to-tr from-blue-200 to-purple-200", bg: "bg-gradient-to-tr from-blue-200 to-purple-200", label: "" },
  { key: "gradient3", className: "border border-gray-200 bg-gradient-to-tr from-green-200 to-blue-400", bg: "bg-gradient-to-tr from-green-200 to-blue-400", label: "" },
  { key: "gradient4", className: "border border-gray-200 bg-gradient-to-tr from-orange-200 to-pink-400", bg: "bg-gradient-to-tr from-orange-200 to-pink-400", label: "" },
  { key: "gradient5", className: "border border-gray-200 bg-gradient-to-tr from-yellow-200 via-green-200 to-blue-300", bg: "bg-gradient-to-tr from-yellow-200 via-green-200 to-blue-300", label: "" },
  // 特殊纹理
  { key: "dots", className: "border border-gray-200 bg-[radial-gradient(circle,_#bbb_1px,transparent_1px)] bg-[size:8px_8px]", bg: "bg-[radial-gradient(circle,_#bbb_1px,transparent_1px)] bg-[size:24px_24px]", label: "" },
  { key: "stripes", className: "border border-gray-200 bg-[repeating-linear-gradient(135deg,#e0e0e0_0_4px,#fff_4px_8px)]", bg: "bg-[repeating-linear-gradient(135deg,#e0e0e0_0_16px,#fff_16px_32px)]", label: "" },
];

export default function WorkbenchPage() {
  const [selectedBg, setSelectedBg] = useState("transparent")
  const selected = backgroundColors.find((c) => c.key === selectedBg)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧图片预览区 */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-8">
        {/* 图片区域 */}
        <div className={`relative flex h-[520px] w-[420px] items-center justify-center rounded-lg shadow ${selected.bg}`}>
          {/* 模拟图片 */}
          <img
            src="/placeholder-face.webp"
            alt=""
            className="h-[440px] w-[340px] rounded object-cover"
          />
        </div>
        {/* 底部操作按钮 */}
        <div className="mt-6 flex gap-3">
          <button className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs">
            <svg width="24" height="24" fill="none">
              <rect width="24" height="24" rx="4" fill="#eee" />
            </svg>
            原尺寸
          </button>
          <button className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs">
            <svg width="24" height="24" fill="none">
              <rect width="24" height="24" rx="4" fill="#eee" />
            </svg>
            裁剪到边缘
          </button>
          <button className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs">
            一寸头像
          </button>
          <button className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs">
            二寸头像
          </button>
          <button className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs">
            淘宝1:1主图
          </button>
          <button className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs">
            淘宝3:4主图
          </button>
          <button className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs">
            拼多多主图
          </button>
          <button className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs">
            小红书封面
          </button>
        </div>
      </div>
      {/* 右侧操作区 */}
      <div className="flex w-[340px] flex-col border-l border-gray-100 bg-white p-8">
        {/* 背景颜色选择 */}
        <div className="mb-6">
          <div className="mb-2 text-sm font-medium">背景颜色</div>
          <div className="flex flex-wrap gap-2">
            {backgroundColors.map((item) => (
              <div
                key={item.key}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded ${item.className} ${selectedBg === item.key ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                onClick={() => setSelectedBg(item.key)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        {/* AI超清、水印消除 */}
        <div className="mb-6 flex flex-col gap-4">
          <Button variant="outline">AI超清</Button>
          <Button variant="outline">水印消除</Button>
        </div>
        {/* 下载、上传按钮 */}
        <div className="mb-6 flex flex-col gap-3">
          <Button className="bg-blue-500 text-white">下载图片</Button>
          <Button>再抠一张</Button>
        </div>
        {/* 结果评价 */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          给这个结果评分
          <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100">
            👍
          </button>
          <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100">
            👎
          </button>
        </div>
      </div>
    </div>
  );
}

export { WorkbenchPage };
