"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ImageCanvas from "./ImageCanvas";
import BackgroundSelector, { getBackgroundName } from "./BackgroundSelector";
import ActionButtons from "./ActionButtons";
import ZoomControl from "./ZoomControl";
import { Crown } from "lucide-react";

function WorkbenchClient({ imgSrc: initialImgSrc, imgKey, isExpired = true }) {
  const [selectedBg, setSelectedBg] = useState("transparent");
  const [selectedRatio, setSelectedRatio] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1); // 默认缩放级别: 1倍
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
    if (initialImgSrc) {
      setImgSrc(initialImgSrc);
    } else {
      // 默认测试图片
      setImgSrc("/examples/example2-processed.png");
    }
  }, [initialImgSrc, imgKey]);

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
        toast.error(
          "图片加载失败，可能是因为链接已过期。请返回主页重新上传图片。",
        );
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
        if (key && key.startsWith("workbench_image_")) {
          try {
            // 从键名中提取时间戳
            const timestamp = parseInt(key.split("_").pop(), 10);
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
        } else if (selectedBg && selectedBg.startsWith("#")) {
          // 处理自定义HEX颜色
          ctx.fillStyle = selectedBg;
          ctx.fillRect(0, 0, outputWidth, outputHeight);
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
        const x = (outputWidth - drawWidth) / 2 + offsetRatioX * outputWidth;
        const y = (outputHeight - drawHeight) / 2 + offsetRatioY * outputHeight;

        // 绘制图像，使用原始图片
        ctx.drawImage(originalImg, x, y, drawWidth, drawHeight);

        // 生成下载文件名（包含背景色信息和实际输出分辨率）
        const timestamp = new Date()
          .toISOString()
          .replace(/[-:.]/g, "")
          .substring(0, 14);
        const bgName = getBackgroundName(selectedBg);
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
        <ZoomControl
          zoomLevel={zoomLevel}
          onZoomChange={handleZoomChange}
          onResetZoom={() => setZoomLevel(1)}
          onResetPosition={resetImagePosition}
          isPositionReset={imageOffset.x === 0 && imageOffset.y === 0}
        />

        {/* 图片加载错误提示 */}
        {imageLoadError ? (
          <div className="flex h-[520px] w-[420px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="mb-4 text-lg font-medium text-gray-800">
              图片无法加载
            </p>
            <p className="mb-6 text-gray-600">
              可能是因为链接已过期或无效。请返回主页重新上传图片。
            </p>
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
        <ActionButtons
          onActionClick={handleRatioClick}
          disabled={imageLoadError}
        />
      </div>
      {/* 右侧操作区 */}
      <div className="relative flex w-[340px] flex-col border-l border-gray-100 bg-white p-8">
        {/* 背景颜色选择 */}
        <BackgroundSelector
          selectedBg={selectedBg}
          onSelectBg={setSelectedBg}
          disabled={imageLoadError}
        />

        {/* AI超清、水印消除 */}
        <div className="mb-6 flex flex-col gap-4">
          {/* <Button variant="outline">AI超清</Button> */}
          {/* <Button variant="outline">水印消除</Button> */}
        </div>

        {/* 下载、上传按钮 */}
        <div className="mb-6 flex flex-col gap-3">
          {isExpired ? (
            <Button>
              <Crown className="mr-2 h-4 w-4" />
              <Link href="/auth/login">升级下载</Link>
            </Button>
          ) : (
            <Button
              className="bg-blue-500 text-white"
              onClick={downloadImage}
              disabled={imageLoadError}
            >
              <Crown className="mr-2 h-4 w-4" />
              下载无水印图片
            </Button>
          )}
          <Button>
            <Link href="/">再次抠图</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WorkbenchClient;
export { WorkbenchClient };
