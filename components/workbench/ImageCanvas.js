"use client";

import { useState, useRef, useEffect, forwardRef } from "react";

// 水印绘制函数
export function drawWatermark(ctx, width, height) {
  console.log("绘制水印: ", width, height); // 添加调试信息
  
  // 保存当前上下文状态
  ctx.save();
  
  // 设置水印文字样式 - 调整透明度为更淡的颜色
  ctx.font = "bold 20px Arial";
  ctx.fillStyle = "rgba(50, 50, 50, 0.15)"; // 降低不透明度，使水印更淡
  
  // 文字内容
  const text = "乘风出海";
  
  // 获取文字宽度以计算网格尺寸
  const textWidth = ctx.measureText(text).width;
  
  // 创建网格尺寸，根据文字大小和画布大小调整
  const gridSize = Math.max(textWidth * 2, 120); // 增加网格尺寸，使水印密度适中
  
  // 旋转整个画布45度 - 确保正确应用旋转
  ctx.translate(width / 2, height / 2);
  ctx.rotate(Math.PI / 4); // 保持45度角
  ctx.translate(-width / 2, -height / 2);
  
  // 计算绘制范围，确保覆盖旋转后的整个画布
  const diagonalLength = Math.sqrt(width * width + height * height);
  const startX = -diagonalLength / 2;
  const startY = -diagonalLength / 2;
  const endX = diagonalLength * 1.5;
  const endY = diagonalLength * 1.5;
  
  // 绘制水印网格
  for (let x = startX; x < endX; x += gridSize) {
    for (let y = startY; y < endY; y += gridSize) {
      // 在网格点绘制文字
      ctx.fillText(text, x - textWidth / 2, y + 5);
    }
  }
  
  // 恢复画布状态
  ctx.restore();
}

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
  }, [ref]);

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

    // 绘制背景 - 先绘制背景
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

    // 在背景上方、图像下方绘制水印
    console.log("在Canvas中绘制水印", w, h);
    drawWatermark(ctx, w, h);

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
      
      // 图片加载完后，再次绘制水印，确保水印在图像之上
      drawWatermark(ctx, w, h);
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
  }, [isDragging, startDragX, startDragY, onOffsetChange, handleMouseDown, handleMouseMove, handleMouseUp]);

  // 在各种参数变化时重绘
  useEffect(() => {
    drawCanvas();
  }, [src, width, height, ratio, background, zoom, offsetX, offsetY, drawCanvas]);

  // 当比例或尺寸变化时重置偏移量
  useEffect(() => {
    setOffsetX(0);
    setOffsetY(0);
  }, [ratio, width, height]);

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

export default ImageCanvas; 