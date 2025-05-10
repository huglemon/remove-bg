"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

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

// Canvas 画布组件 - 使用 forwardRef 暴露 canvas 引用
const ImageCanvas = forwardRef(function ImageCanvas(
  {
    src,
    width = 420,
    height = 520,
    ratio = null,
    background = "transparent",
    zoom = 1,
    onOffsetChange,
    offsetX: externalOffsetX,
    offsetY: externalOffsetY,
  },
  ref,
) {
  const internalCanvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(externalOffsetX || 0);
  const [offsetY, setOffsetY] = useState(externalOffsetY || 0);
  const [startDragX, setStartDragX] = useState(0);
  const [startDragY, setStartDragY] = useState(0);
  const imageInfoRef = useRef({ width: 0, height: 0, x: 0, y: 0 });

  // 将内部ref暴露给父组件
  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(internalCanvasRef.current);
      } else {
        ref.current = internalCanvasRef.current;
      }
    }
  }, [ref, internalCanvasRef.current]);

  // 监听外部传入的偏移量变化
  useEffect(() => {
    if (externalOffsetX !== undefined) setOffsetX(externalOffsetX);
  }, [externalOffsetX]);

  useEffect(() => {
    if (externalOffsetY !== undefined) setOffsetY(externalOffsetY);
  }, [externalOffsetY]);

  // 重绘画布
  const drawCanvas = () => {
    if (!src || !internalCanvasRef.current) return;
    const canvas = internalCanvasRef.current;
    const ctx = canvas.getContext("2d");

    // 计算画布尺寸
    let w = width,
      h = height;
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
          ctx.fillStyle =
            (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0
              ? "#eaeaea"
              : "#fff";
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
    img.onload = function () {
      // 基础缩放比例 - 确保图片完全可见
      const baseScale = Math.min(w / img.width, h / img.height);

      // 应用用户的缩放因子
      const finalScale = baseScale * zoom;

      // 计算绘制尺寸
      const drawWidth = img.width * finalScale;
      const drawHeight = img.height * finalScale;

      // 带偏移量的定位
      const x = (w - drawWidth) / 2 + offsetX;
      const y = (h - drawHeight) / 2 + offsetY;

      // 存储图像信息供拖动使用
      imageInfoRef.current = {
        width: drawWidth,
        height: drawHeight,
        x: x,
        y: y
      };

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };
    img.src = src;
  };

  // 处理鼠标事件
  const handleMouseDown = (e) => {
    const canvas = internalCanvasRef.current;
    if (!canvas) return;

    // 获取鼠标相对于canvas的位置
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 检查点击是否在图像内
    const imgInfo = imageInfoRef.current;
    if (
      mouseX >= imgInfo.x &&
      mouseX <= imgInfo.x + imgInfo.width &&
      mouseY >= imgInfo.y &&
      mouseY <= imgInfo.y + imgInfo.height
    ) {
      setIsDragging(true);
      setStartDragX(mouseX - imgInfo.x);
      setStartDragY(mouseY - imgInfo.y);
      // 设置cursor为grabbing
      canvas.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e) => {
    // 鼠标悬停在图像上时改变鼠标样式
    const canvas = internalCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 检查鼠标是否在图像上
    const imgInfo = imageInfoRef.current;
    if (
      mouseX >= imgInfo.x &&
      mouseX <= imgInfo.x + imgInfo.width &&
      mouseY >= imgInfo.y &&
      mouseY <= imgInfo.y + imgInfo.height
    ) {
      if (!isDragging) canvas.style.cursor = "grab";
    } else {
      if (!isDragging) canvas.style.cursor = "default";
    }

    // 如果正在拖动，更新图像位置
    if (isDragging) {
      // 计算新位置
      const newX = mouseX - startDragX;
      const newY = mouseY - startDragY;
      
      // 计算位置偏移量
      const newOffsetX = newX - ((canvas.width - imgInfo.width) / 2);
      const newOffsetY = newY - ((canvas.height - imgInfo.height) / 2);
      
      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
      
      // 通知父组件偏移量变化
      if (onOffsetChange) {
        onOffsetChange(newOffsetX, newOffsetY);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (internalCanvasRef.current) {
        internalCanvasRef.current.style.cursor = "default";
      }
    }
  };

  // 在组件卸载时移除鼠标事件监听器
  useEffect(() => {
    const canvas = internalCanvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startDragX, startDragY, onOffsetChange]);

  // 在各种参数变化时重绘
  useEffect(() => {
    drawCanvas();
  }, [src, width, height, ratio, background, zoom, offsetX, offsetY]);

  // 当比例或尺寸变化时重置偏移量
  useEffect(() => {
    setOffsetX(0);
    setOffsetY(0);
  }, [ratio, width, height]);

  // 添加一个函数用于处理图像偏移更新
  const handleImageOffsetChange = (offsetX, offsetY) => {
    setOffsetX(offsetX);
    setOffsetY(offsetY);
    if (onOffsetChange) {
      onOffsetChange(offsetX, offsetY);
    }
  };

  return (
    <canvas
      ref={internalCanvasRef}
      width={width}
      height={height}
      className="rounded-lg shadow"
      style={{ width: width, height: height }}
    />
  );
});

export default function WorkbenchPage() {
  const [selectedBg, setSelectedBg] = useState("transparent");
  const [selectedRatio, setSelectedRatio] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1); // 默认缩放级别: 1倍
  const searchParams = useSearchParams();
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imgSrc, setImgSrc] = useState(""); // 图片源现在是动态设置的
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 }); // 存储图像偏移量

  // 保存原始尺寸，防止重复调整导致画布不断缩小
  const [originalWidth] = useState(420);
  const [originalHeight] = useState(520);
  const [canvasWidth, setCanvasWidth] = useState(originalWidth);
  const [canvasHeight, setCanvasHeight] = useState(originalHeight);

  // 用于下载的引用 - 直接引用canvas元素
  const canvasRef = useRef(null);

  // 获取图片源
  useEffect(() => {
    // 尝试从localStorage获取图片
    const imgKey = searchParams.get("imgKey");
    if (imgKey) {
      try {
        const storedImage = localStorage.getItem(imgKey);
        if (storedImage) {
          setImgSrc(storedImage);
          return;
        }
      } catch (error) {
        console.error("从localStorage读取图片失败:", error);
      }
    }

    // 回退到URL参数或默认图片
    const urlImg = searchParams.get("img");
    if (urlImg) {
      setImgSrc(urlImg);
    } else {
      // 默认测试图片
      setImgSrc("/examples/example2-processed.png");
    }
  }, [searchParams]);

  // 生成背景名称（用于文件名）
  const getBackgroundName = () => {
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
  };

  // 添加图片加载错误处理
  useEffect(() => {
    // 测试图片URL是否可访问
    if (imgSrc) {
      const testImg = new Image();
      testImg.onload = () => {
        setImageLoadError(false);
      };
      testImg.onerror = () => {
        // 图片无法加载
        setImageLoadError(true);
        toast.error("图片加载失败，可能是因为链接已过期。请返回主页重新上传图片。");
      };
      testImg.src = imgSrc;
    }
  }, [imgSrc]);

  // 在组件卸载时清理localStorage
  useEffect(() => {
    return () => {
      // 找到所有工作台图片键并删除24小时以上的
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // 24小时
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('workbench_image_')) {
          try {
            // 从键名中提取时间戳
            const timestamp = parseInt(key.split('_').pop(), 10);
            if (now - timestamp > oneDay) {
              localStorage.removeItem(key);
            }
          } catch (error) {
            console.error("清理localStorage时出错:", error);
          }
        }
      }
    };
  }, []);

  // 下载画布内容为图片（使用原始图片的真实像素）
  const downloadImage = () => {
    // 安全检查
    if (!canvasRef.current) {
      console.error("Canvas reference not available");
      return;
    }

    try {
      // 加载原始图片，获取真实尺寸
      const originalImg = new Image();
      originalImg.crossOrigin = "anonymous";

      originalImg.onload = function () {
        // 获取原始图片的尺寸
        const originalWidth = originalImg.width;
        const originalHeight = originalImg.height;

        // 按照当前选择的比例和缩放创建输出canvas
        let outputWidth, outputHeight;

        // 如果选择了特定比例，按照比例调整输出尺寸
        if (selectedRatio) {
          if (originalWidth / originalHeight > selectedRatio) {
            // 以高度为基准
            outputHeight = originalHeight;
            outputWidth = Math.round(originalHeight * selectedRatio);
          } else {
            // 以宽度为基准
            outputWidth = originalWidth;
            outputHeight = Math.round(originalWidth / selectedRatio);
          }
        } else {
          // 没有选择特定比例，使用原始尺寸
          outputWidth = originalWidth;
          outputHeight = originalHeight;
        }

        // 创建输出canvas
        const outputCanvas = document.createElement("canvas");
        outputCanvas.width = outputWidth;
        outputCanvas.height = outputHeight;
        const ctx = outputCanvas.getContext("2d");

        // 绘制背景
        if (selectedBg === "transparent") {
          // 棋盘格背景 - 使用更小的棋盘格，适应高分辨率
          const tileSize = Math.ceil(Math.max(outputWidth, outputHeight) / 30); // 动态计算合适的棋盘格大小
          for (let y = 0; y < outputHeight; y += tileSize) {
            for (let x = 0; x < outputWidth; x += tileSize) {
              ctx.fillStyle =
                (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0
                  ? "#eaeaea"
                  : "#fff";
              ctx.fillRect(x, y, tileSize, tileSize);
            }
          }
        } else if (selectedBg === "white") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "black") {
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "gray") {
          ctx.fillStyle = "#d1d5db";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "gray-dark") {
          ctx.fillStyle = "#4b5563";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "red") {
          ctx.fillStyle = "#ef4444";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "orange") {
          ctx.fillStyle = "#f97316";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "yellow") {
          ctx.fillStyle = "#fbbf24";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "green") {
          ctx.fillStyle = "#4ade80";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "teal") {
          ctx.fillStyle = "#2dd4bf";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "blue") {
          ctx.fillStyle = "#3b82f6";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "indigo") {
          ctx.fillStyle = "#818cf8";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "purple") {
          ctx.fillStyle = "#a855f7";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "pink") {
          ctx.fillStyle = "#ec4899";
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "gradient1") {
          const gradient = ctx.createLinearGradient(
            0,
            0,
            outputWidth,
            outputHeight,
          );
          gradient.addColorStop(0, "#f472b6");
          gradient.addColorStop(1, "#fde68a");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "gradient2") {
          const gradient = ctx.createLinearGradient(
            0,
            0,
            outputWidth,
            outputHeight,
          );
          gradient.addColorStop(0, "#bfdbfe");
          gradient.addColorStop(1, "#e9d5ff");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "gradient3") {
          const gradient = ctx.createLinearGradient(
            0,
            0,
            outputWidth,
            outputHeight,
          );
          gradient.addColorStop(0, "#bbf7d0");
          gradient.addColorStop(1, "#93c5fd");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "gradient4") {
          const gradient = ctx.createLinearGradient(
            0,
            0,
            outputWidth,
            outputHeight,
          );
          gradient.addColorStop(0, "#fed7aa");
          gradient.addColorStop(1, "#f9a8d4");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "gradient5") {
          const gradient = ctx.createLinearGradient(
            0,
            0,
            outputWidth,
            outputHeight,
          );
          gradient.addColorStop(0, "#fef08a");
          gradient.addColorStop(0.5, "#bbf7d0");
          gradient.addColorStop(1, "#93c5fd");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, outputWidth, outputHeight);
        } else if (selectedBg === "dots") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outputWidth, outputHeight);

          ctx.fillStyle = "#bbbbbb";
          const dotSize = Math.max(1, Math.ceil(outputWidth / 500)); // 动态计算合适的点大小
          const spacing = Math.ceil(outputWidth / 30); // 动态计算合适的间距
          for (let y = 0; y < outputHeight; y += spacing) {
            for (let x = 0; x < outputWidth; x += spacing) {
              ctx.beginPath();
              ctx.arc(x, y, dotSize, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        } else if (selectedBg === "stripes") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outputWidth, outputHeight);

          const stripeHeight = Math.ceil(outputHeight / 30); // 动态计算合适的条纹高度
          ctx.fillStyle = "#e0e0e0";
          for (let y = 0; y < outputHeight; y += stripeHeight * 2) {
            ctx.fillRect(0, y, outputWidth, stripeHeight);
          }
        }

        // 绘制原图，应用当前的缩放
        // 计算绘制尺寸和位置，保持纵横比
        // 基础缩放比例 - 确保图片完全可见
        const baseScale = Math.min(
          outputWidth / originalWidth,
          outputHeight / originalHeight,
        );

        // 应用用户的缩放系数
        const finalScale = baseScale * zoomLevel;

        // 计算绘制尺寸
        const drawWidth = originalWidth * finalScale;
        const drawHeight = originalHeight * finalScale;

        // 计算偏移量比例用于导出图像
        const offsetRatioX = imageOffset.x / canvasRef.current.width;
        const offsetRatioY = imageOffset.y / canvasRef.current.height;

        // 居中定位并添加偏移量
        const x = (outputWidth - drawWidth) / 2 + (offsetRatioX * outputWidth);
        const y = (outputHeight - drawHeight) / 2 + (offsetRatioY * outputHeight);

        // 绘制图像，使用原始图片
        ctx.drawImage(originalImg, x, y, drawWidth, drawHeight);

        // 生成下载文件名（包含背景色信息和实际输出分辨率）
        const timestamp = new Date()
          .toISOString()
          .replace(/[-:.]/g, "")
          .substring(0, 14);
        const bgName = getBackgroundName();
        const resolution = `${outputWidth}x${outputHeight}`;
        const fileName = `图片_${bgName}_${resolution}_${timestamp}.png`;

        // 获取图片数据 URL（最高质量）
        const dataUrl = outputCanvas.toDataURL("image/png", 1.0);

        // 创建临时下载链接并点击
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = fileName;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        // 清理
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(dataUrl);
        }, 100);
      };

      // 启动处理流程 - 加载原始图片
      originalImg.src = imgSrc;
    } catch (error) {
      console.error("下载图片时出错:", error);
      alert("下载图片失败，请重试");
    }
  };

  // 处理比例按钮点击 - 修复不断缩小问题
  const handleRatioClick = (button) => {
    // 更新选中比例
    setSelectedRatio(button.ratio);
    
    // 重置图像偏移量
    setImageOffset({ x: 0, y: 0 });

    if (button.ratio) {
      // 总是从原始尺寸开始计算，确保不会逐渐缩小
      if (originalWidth / originalHeight > button.ratio) {
        // 以高度为基准计算宽度
        setCanvasWidth(Math.round(originalHeight * button.ratio));
        setCanvasHeight(originalHeight);
      } else {
        // 以宽度为基准计算高度
        setCanvasWidth(originalWidth);
        setCanvasHeight(Math.round(originalWidth / button.ratio));
      }
    } else {
      // 还原为原始尺寸
      setCanvasWidth(originalWidth);
      setCanvasHeight(originalHeight);
    }
  };

  // 处理缩放滑块变化
  const handleZoomChange = (value) => {
    setZoomLevel(value[0]);
  };

  // 重置图像位置
  const resetImagePosition = () => {
    setImageOffset({ x: 0, y: 0 });
  };

  // 处理图像偏移变化
  const handleImageOffsetChange = (offsetX, offsetY) => {
    setImageOffset({ x: offsetX, y: offsetY });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧图片预览区 */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-8">
        {/* 缩放滑块 */}
        <div className="mb-4 flex w-[420px] flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span>缩放: {Math.round(zoomLevel * 100)}%</span>
            <div className="flex items-center gap-2">
              <button
                className="text-xs text-blue-500"
                onClick={() => setZoomLevel(1)}
              >
                重置缩放
              </button>
              <span className="text-gray-300">|</span>
              <button
                className="text-xs text-blue-500"
                onClick={resetImagePosition}
                disabled={imageOffset.x === 0 && imageOffset.y === 0}
              >
                重置位置
              </button>
            </div>
          </div>
          <Slider
            defaultValue={[1]}
            value={[zoomLevel]}
            min={0.5}
            max={2}
            step={0.05}
            onValueChange={handleZoomChange}
          />
        </div>

        {/* 拖动提示 */}
        {/* <div className="mb-2 flex items-center justify-center gap-1 text-xs text-gray-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="h-4 w-4"
          >
            <path d="M8 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-6a6 6 0 0 0-1.5 11.85v4.65a.5.5 0 0 0 1 0V16h1a.5.5 0 0 0 0-1h-1v-2.15A6 6 0 0 0 12 1Z" />
          </svg>
          <span>可直接用鼠标拖动调整图像位置</span>
        </div> */}

        {/* 图片加载错误提示 */}
        {imageLoadError ? (
          <div className="flex h-[520px] w-[420px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="mb-4 text-lg font-medium text-gray-800">图片无法加载</p>
            <p className="mb-6 text-gray-600">可能是因为链接已过期或无效。请返回主页重新上传图片。</p>
            <Button>
              <Link href="/">返回主页</Link>
            </Button>
          </div>
        ) : (
          <ImageCanvas
            ref={canvasRef}
            src={imgSrc}
            width={canvasWidth}
            height={canvasHeight}
            ratio={selectedRatio}
            background={selectedBg}
            zoom={zoomLevel}
            onOffsetChange={handleImageOffsetChange}
            offsetX={imageOffset.x}
            offsetY={imageOffset.y}
          />
        )}

        {/* 底部操作按钮 */}
        <div className="mt-6 flex gap-3">
          {actionButtons.map((btn) => (
            <button
              key={btn.key}
              className="flex flex-col items-center rounded border border-gray-200 bg-white px-3 py-2 text-xs"
              onClick={() => handleRatioClick(btn)}
              disabled={imageLoadError}
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
      <div className="relative flex w-[340px] flex-col border-l border-gray-100 bg-white p-8">
        {/* 背景颜色选择 */}
        <div className="mb-6">
          <div className="mb-2 text-sm font-medium">背景颜色</div>
          <div className="flex flex-wrap gap-2">
            {backgroundColors.map((item) => (
              <div
                key={item.key}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded ${item.className} ${selectedBg === item.bg ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
                onClick={() => setSelectedBg(item.bg)}
                style={{ opacity: imageLoadError ? 0.5 : 1, pointerEvents: imageLoadError ? 'none' : 'auto' }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        {/* AI超清、水印消除 */}
        <div className="mb-6 flex flex-col gap-4">
          {/* <Button variant="outline">AI超清</Button> */}
          {/* <Button variant="outline">水印消除</Button> */}
        </div>
        {/* 下载、上传按钮 */}
        <div className="mb-6 flex flex-col gap-3">
          <Button 
            className="bg-blue-500 text-white" 
            onClick={downloadImage}
            disabled={imageLoadError}
          >
            下载图片
          </Button>
          <Button>
            <Link href="/">再次抠图</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { WorkbenchPage };
