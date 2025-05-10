"use client";

import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import CompareImage from "react-compare-image";

interface ImageCompareResultProps {
  originalImage: string;
  processedImage: string;
  fileName?: string;
  onReset?: () => void;
}

export function ImageCompareResult({
  originalImage,
  processedImage,
  fileName,
  onReset,
}: ImageCompareResultProps) {
  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = `inwind-bg-removed-${fileName || "image"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">处理结果</h3>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>👈 原图</span>
            <span>|</span>
            <span>处理后 👉</span>
          </div>
        </div>
      </div>

      <div className="relative w-full p-4" style={{ aspectRatio: "4:3" }}>
        <div className="relative w-full h-full [&_.right-image]:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6IiBmaWxsPSIjZjFmNWY5IiBmaWxsLW9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] [&_.right-image]:bg-[length:20px_20px]">
          <CompareImage
            leftImage={originalImage}
            rightImage={processedImage}
            leftImageAlt="处理前图片"
            rightImageAlt="处理后图片"
            rightImageCss={{
              backgroundImage: `
                linear-gradient(45deg, rgba(241, 245, 249, 0.5) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(241, 245, 249, 0.5) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(241, 245, 249, 0.5) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(241, 245, 249, 0.5) 75%)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
            }}
            sliderLineWidth={2}
            sliderLineColor="#ffffff"
            handleSize={40}
            hover={true}
            aspectRatio="wider"
          />
        </div>
      </div>

      {onReset && (
        <div className="bg-gray-50/50 backdrop-blur-sm p-4">
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
            <Button
              onClick={onReset}
              variant="outline"
              className="border-gray-300/50 bg-white/50 text-gray-700 backdrop-blur-sm hover:bg-white/70"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              重新上传
            </Button>
            <Button
              onClick={handleDownload}
              className="bg-gradient-to-r from-blue-600/90 to-violet-600/90 backdrop-blur-sm hover:from-blue-700/90 hover:to-violet-700/90"
            >
              <Download className="mr-2 h-4 w-4" />
              下载处理结果
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
