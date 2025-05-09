"use client";

import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fileToDataUrl, processImageBackground } from "@/lib/backgroundRemoval";
import { ProcessingLoader } from "@/components/ProcessingLoader";
import { ImageCompareResult } from "@/components/ImageCompareResult";
import { ProcessingError } from "@/components/ProcessingError";

function ImageSingleUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalImageDataUrl, setOriginalImageDataUrl] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 清理URL对象，防止内存泄漏
  useEffect(() => {
    return () => {
      if (processedImage && processedImage.startsWith("blob:")) {
        URL.revokeObjectURL(processedImage);
      }
    };
  }, [processedImage]);

  const handleFileChange = async (files) => {
    try {
      // 清理之前的状态
      setIsLoading(false);
      if (processedImage && processedImage.startsWith("blob:")) {
        URL.revokeObjectURL(processedImage);
        setProcessedImage(null);
      }
      setOriginalImageDataUrl(null);

      if (!files || files.length === 0) {
        setSelectedImage(null);
        return;
      }

      // 只处理第一个文件
      const file = files[0];
      
      // 将文件转换为 Data URL (不会过期)
      const dataUrl = await fileToDataUrl(file);
      setSelectedImage(file);
      setOriginalImageDataUrl(dataUrl);
      setIsLoading(true);

      try {
        // 处理图片
        const processedUrl = await processImageBackground(file);
        setProcessedImage(processedUrl);
      } catch (e) {
        console.error("背景移除失败:", e);
        toast.error("背景移除失败，请检查图片或稍后再试。");
      } finally {
        setIsLoading(false);
      }
    } catch (err) {
      console.error("处理图片时出错:", err);
      toast.error("处理图片时出错，请重试。");
      setIsLoading(false);
    }
  };

  const resetSelection = () => {
    handleFileChange(null);
  };

  // 使用 ImageUploader 组件的功能
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length) {
        handleFileChange([acceptedFiles[0]]);
      }
    },
  });

  const renderUploader = () => (
    <div
      {...getRootProps()}
      className={`flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
        isDragActive ? "border-blue-500 bg-blue-50/30" : "border-gray-300/50 hover:border-blue-400/50 hover:bg-white/20"
      } bg-white/10 backdrop-blur-sm p-6 md:p-8`}
    >
      <input {...getInputProps()} />
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100/80 backdrop-blur-sm">
        <SparklesIcon className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">上传您的图片</h3>
      <p className="mb-6 text-center text-gray-600">
        拖放图片至此处，或点击下方按钮选择
      </p>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        className="h-12 bg-gradient-to-r from-blue-600/90 to-violet-600/90 backdrop-blur-sm px-8 text-base hover:from-blue-700/90 hover:to-violet-700/90"
      >
        选择图片
      </Button>
      <p className="mt-4 text-xs text-gray-500">
        支持 JPG、PNG 和 WEBP 格式，文件大小不超过 10MB
      </p>
    </div>
  );

  return (
    <div className="relative w-full">
      {!originalImageDataUrl && !isLoading ? (
        renderUploader()
      ) : (
        <>
          {/* 加载中 */}
          {isLoading && (
            <div className="rounded-xl border border-gray-100/30 bg-white/30 backdrop-blur-sm p-6 shadow-sm">
              <ProcessingLoader />
              <p className="mt-4 text-center text-sm text-gray-600">
                正在智能处理您的图片，请稍候...
              </p>
            </div>
          )}

          {/* 处理结果 */}
          {!isLoading && processedImage && originalImageDataUrl && (
            <div className="overflow-hidden rounded-xl border border-gray-100/30 bg-white/30 backdrop-blur-sm shadow-sm">
              <ImageCompareResult
                originalImage={originalImageDataUrl}
                processedImage={processedImage}
                fileName={selectedImage?.name}
                onReset={resetSelection}
              />
            </div>
          )}

          {/* 处理失败 */}
          {!isLoading && !processedImage && originalImageDataUrl && (
            <div className="overflow-hidden rounded-xl border border-gray-100/30 bg-white/30 backdrop-blur-sm shadow-sm">
              <ProcessingError
                imageUrl={originalImageDataUrl}
                onReset={resetSelection}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { ImageSingleUploader };
