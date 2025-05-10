"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

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
  {
    key: "amazon",
    label: "亚马逊主图",
    icon: "/logo/amazon.svg",
    ratio: 1, // 1:1
  },
  {
    key: "amazon-mobile",
    label: "亚马逊移动端",
    icon: "/logo/amazon.svg",
    ratio: 0.79, // 1:1.26 移动端最佳比例
  },
  {
    key: "1688",
    label: "1688主图",
    icon: "/logo/1688.svg",
    ratio: 1, // 1:1 正方形
  },
  {
    key: "alibaba",
    label: "国际站主图",
    icon: "/logo/alibaba.svg",
    ratio: 1, // 近似正方形 1:1~1:1.3
  },
];

function ActionButtons({ onActionClick, disabled = false }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 滚动速度系数
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 处理触摸事件
  const handleTouchStart = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // 页面加载时添加事件监听
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div 
      ref={scrollRef}
      className={`mt-6 flex gap-3 max-w-3xl mx-auto overflow-x-auto whitespace-nowrap hide-scrollbar ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {actionButtons.map((btn) => (
        <button
          key={btn.key}
          className="flex flex-col items-center rounded border border-gray-200 min-w-24 bg-white px-3 py-2 text-xs flex-shrink-0"
          onClick={() => onActionClick(btn)}
          disabled={disabled}
        >
          <Image
            src={btn.icon || "/logo/id.svg"}
            alt={btn.label}
            width={32}
            height={32}
            className="mb-2 text-gray-400"
            draggable="false"
          />
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default ActionButtons;
