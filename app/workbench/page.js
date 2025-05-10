"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

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

const actionButtons = [
  {
    key: "original",
    label: "原尺寸",
    icon: "/logo/original.svg",
    ratio: null, // 保持原始比例
  },
  {
    key: "crop",
    label: "裁剪到边缘",
    icon: "/logo/crop.svg",
    ratio: null, // 保持原始比例但裁剪到边缘
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

// Canvas 画布组件
function ImageCanvas({ src, width = 420, height = 520, ratio = null, background = "transparent" }) {
  const canvasRef = useRef(null);

  // 重绘画布
  const drawCanvas = () => {
    if (!src || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // 计算画布尺寸
    let w = width, h = height;
    if (ratio) {
      // 根据比例调整画布尺寸
      if (width / height > ratio) {
        w = h * ratio;
      } else {
        h = w / ratio;
      }
    }
    canvas.width = w;
    canvas.height = h;
    
    // 清空画布
    ctx.clearRect(0, 0, w, h);

    // 绘制背景
    if (background === "transparent") {
      // 棋盘格背景
      const tileSize = 30;
      for (let y = 0; y < h; y += tileSize) {
        for (let x = 0; x < w; x += tileSize) {
          ctx.fillStyle = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0 ? "#eaeaea" : "#fff";
          ctx.fillRect(x, y, tileSize, tileSize);
        }
      }
    } else if (background === "white") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "black") {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "gray") {
      ctx.fillStyle = "#d1d5db";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "gray-dark") {
      ctx.fillStyle = "#4b5563";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "red") {
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "orange") {
      ctx.fillStyle = "#f97316";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "yellow") {
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "green") {
      ctx.fillStyle = "#4ade80";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "teal") {
      ctx.fillStyle = "#2dd4bf";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "blue") {
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "indigo") {
      ctx.fillStyle = "#818cf8";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "purple") {
      ctx.fillStyle = "#a855f7";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "pink") {
      ctx.fillStyle = "#ec4899";
      ctx.fillRect(0, 0, w, h);
    } else if (background === "gradient1") {
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#f472b6"); // pink-400
      gradient.addColorStop(1, "#fde68a"); // yellow-300
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    } else if (background === "gradient2") {
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#bfdbfe"); // blue-200
      gradient.addColorStop(1, "#e9d5ff"); // purple-200
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    } else if (background === "gradient3") {
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#bbf7d0"); // green-200
      gradient.addColorStop(1, "#93c5fd"); // blue-300
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    } else if (background === "gradient4") {
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#fed7aa"); // orange-200
      gradient.addColorStop(1, "#f9a8d4"); // pink-300
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    } else if (background === "gradient5") {
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#fef08a"); // yellow-200
      gradient.addColorStop(0.5, "#bbf7d0"); // green-200
      gradient.addColorStop(1, "#93c5fd"); // blue-300
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    } else if (background === "dots") {
      // 绘制点状背景
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      
      ctx.fillStyle = "#bbbbbb";
      const dotSize = 1;
      const spacing = 24;
      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (background === "stripes") {
      // 绘制条纹背景
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      
      const stripeHeight = 16;
      ctx.fillStyle = "#e0e0e0";
      for (let y = 0; y < h; y += stripeHeight * 2) {
        ctx.fillRect(0, y, w, stripeHeight);
      }
    }

    // 加载并绘制图片
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function() {
      let drawWidth, drawHeight, x, y;
      
      // 是否裁剪到边缘
      if (background === "crop") {
        // 裁剪到边缘：图像将填充整个画布
        const scale = Math.max(w / img.width, h / img.height);
        drawWidth = img.width * scale;
        drawHeight = img.height * scale;
        x = (w - drawWidth) / 2;
        y = (h - drawHeight) / 2;
      } else {
        // 保持完整：图像将完全可见
        const scale = Math.min(w / img.width, h / img.height);
        drawWidth = img.width * scale;
        drawHeight = img.height * scale;
        x = (w - drawWidth) / 2;
        y = (h - drawHeight) / 2;
      }
      
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };
    img.src = src;
  };

  useEffect(() => {
    drawCanvas();
  }, [src, width, height, ratio, background]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg shadow"
      style={{ width: width, height: height }}
    />
  );
}

export default function WorkbenchPage() {
  const [selectedBg, setSelectedBg] = useState("transparent");
  const [selectedRatio, setSelectedRatio] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(420);
  const [canvasHeight, setCanvasHeight] = useState(520);
  
  // 用于下载的引用
  const canvasRef = useRef(null);
  
  // 测试图片 URL (透明 PNG)
  const imgSrc = "/examples/example2-processed.png";
  
  // 下载画布内容为图片
  const downloadImage = () => {
    if (!canvasRef.current) return;
    
    // 获取 canvas 元素
    const canvas = canvasRef.current.canvasRef.current;
    if (!canvas) return;
    
    // 获取图片数据 URL
    const dataUrl = canvas.toDataURL("image/png");
    
    // 创建一个临时下载链接
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "processed-image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  // 处理比例按钮点击
  const handleRatioClick = (button) => {
    setSelectedRatio(button.ratio);
    if (button.ratio) {
      // 调整画布尺寸以匹配比例
      if (canvasWidth / canvasHeight > button.ratio) {
        setCanvasWidth(Math.round(canvasHeight * button.ratio));
      } else {
        setCanvasHeight(Math.round(canvasWidth / button.ratio));
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧图片预览区 */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-8">
        {/* 图片区域 - 替换为 Canvas */}
        <ImageCanvas
          ref={canvasRef}
          src={imgSrc}
          width={canvasWidth}
          height={canvasHeight}
          ratio={selectedRatio}
          background={selectedBg}
        />
        
        {/* 底部操作按钮 */}
        <div className="mt-6 flex gap-3">
          {actionButtons.map((btn) => (
            <button
              key={btn.key}
              className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs"
              onClick={() => handleRatioClick(btn)}
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
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded ${item.className} ${selectedBg === item.bg ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
                onClick={() => setSelectedBg(item.bg)}
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
          <Button className="bg-blue-500 text-white" onClick={downloadImage}>下载图片</Button>
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
