"use client";

// 操作按钮配置
const actionButtons = [
  {
    key: "original",
    label: "原尺寸",
    icon: "/logo/original.svg",
    ratio: null, // 保持原始比例
  },
  {
    key: "id-1",
    label: "一寸头像",
    icon: "/logo/id.svg",
    ratio: 0.714, // 5:7
  },
  {
    key: "id-2",
    label: "二寸头像",
    icon: "/logo/id.svg",
    ratio: 0.714, // 5:7 (同一寸但尺寸更大)
  },
  {
    key: "taobao-11",
    label: "淘宝1:1主图",
    icon: "/logo/tb.svg",
    ratio: 1, // 1:1
  },
  {
    key: "taobao-34",
    label: "淘宝3:4主图",
    icon: "/logo/tb.svg",
    ratio: 0.75, // 3:4
  },
  {
    key: "pdd",
    label: "拼多多主图",
    icon: "/logo/pdd.svg",
    ratio: 1, // 1:1
  },
  {
    key: "xiaohongshu",
    label: "小红书封面",
    icon: "/logo/xhs.svg",
    ratio: 0.75, // 3:4
  },
];

function ActionButtons({ onActionClick, disabled = false }) {
  return (
    <div className="mt-6 flex gap-3">
      {actionButtons.map((btn) => (
        <button
          key={btn.key}
          className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs"
          onClick={() => onActionClick(btn)}
          disabled={disabled}
        >
          <img
            src={btn.icon || "/logo/id.svg"}
            alt={btn.label}
            className="mb-2 h-8 w-8 text-gray-400"
          />
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default ActionButtons; 