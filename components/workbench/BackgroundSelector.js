"use client";

import { useState } from "react";

// 背景颜色选项
const backgroundColors = [
  // 透明/马赛克
  {
    key: "transparent",
    className:
      "border-2 border-blue-400 bg-[linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea),linear-gradient(45deg,#eaeaea_25%,transparent_25%,transparent_75%,#eaeaea_75%,#eaeaea)] bg-[length:30px_30px] bg-[position:0_0,15px_15px] text-gray-900 antialiased",
    bg: "transparent",
    label: "",
  },
  // 纯色
  {
    key: "white",
    className: "border border-gray-200 bg-white",
    bg: "white",
    label: "",
  },
  {
    key: "black",
    className: "border border-gray-200 bg-black",
    bg: "black",
    label: "",
  },
  {
    key: "gray",
    className: "border border-gray-200 bg-gray-300",
    bg: "gray",
    label: "",
  },
  {
    key: "gray-dark",
    className: "border border-gray-200 bg-gray-700",
    bg: "gray-dark",
    label: "",
  },
  {
    key: "red",
    className: "border border-gray-200 bg-red-500",
    bg: "red",
    label: "",
  },
  {
    key: "orange",
    className: "border border-gray-200 bg-orange-400",
    bg: "orange",
    label: "",
  },
  {
    key: "yellow",
    className: "border border-gray-200 bg-yellow-300",
    bg: "yellow",
    label: "",
  },
  {
    key: "green",
    className: "border border-gray-200 bg-green-400",
    bg: "green",
    label: "",
  },
  {
    key: "teal",
    className: "border border-gray-200 bg-teal-400",
    bg: "teal",
    label: "",
  },
  {
    key: "blue",
    className: "border border-gray-200 bg-blue-500",
    bg: "blue",
    label: "",
  },
  {
    key: "indigo",
    className: "border border-gray-200 bg-indigo-400",
    bg: "indigo",
    label: "",
  },
  {
    key: "purple",
    className: "border border-gray-200 bg-purple-400",
    bg: "purple",
    label: "",
  },
  {
    key: "pink",
    className: "border border-gray-200 bg-pink-400",
    bg: "pink",
    label: "",
  },
  // 渐变
  {
    key: "gradient1",
    className:
      "border-2 border-blue-400 bg-gradient-to-tr from-pink-400 to-yellow-300",
    bg: "gradient1",
    label: "",
  },
  {
    key: "gradient2",
    className:
      "border border-gray-200 bg-gradient-to-tr from-blue-200 to-purple-200",
    bg: "gradient2",
    label: "",
  },
  {
    key: "gradient3",
    className:
      "border border-gray-200 bg-gradient-to-tr from-green-200 to-blue-400",
    bg: "gradient3",
    label: "",
  },
  {
    key: "gradient4",
    className:
      "border border-gray-200 bg-gradient-to-tr from-orange-200 to-pink-400",
    bg: "gradient4",
    label: "",
  },
  {
    key: "gradient5",
    className:
      "border border-gray-200 bg-gradient-to-tr from-yellow-200 via-green-200 to-blue-300",
    bg: "gradient5",
    label: "",
  },
  // 特殊纹理
  {
    key: "dots",
    className:
      "border border-gray-200 bg-[radial-gradient(circle,_#bbb_1px,transparent_1px)] bg-[size:8px_8px]",
    bg: "dots",
    label: "",
  },
  {
    key: "stripes",
    className:
      "border border-gray-200 bg-[repeating-linear-gradient(135deg,#e0e0e0_0_4px,#fff_4px_8px)]",
    bg: "stripes",
    label: "",
  },
];

function BackgroundSelector({ selectedBg, onSelectBg, disabled = false }) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-sm font-medium">背景颜色</div>
      <div className="flex flex-wrap gap-2">
        {backgroundColors.map((item) => (
          <div
            key={item.key}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded ${item.className} ${selectedBg === item.bg ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
            onClick={() => onSelectBg(item.bg)}
            style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// 获取背景名称（用于文件名）
export function getBackgroundName(selectedBg) {
  switch (selectedBg) {
    case "transparent":
      return "透明";
    case "white":
      return "白色";
    case "black":
      return "黑色";
    case "gradient1":
      return "渐变粉黄";
    case "gradient2":
      return "渐变蓝紫";
    default:
      return selectedBg;
  }
}

export default BackgroundSelector; 