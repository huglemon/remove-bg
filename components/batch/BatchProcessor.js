"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/ImageUploader";
import { ProcessingLoader } from "@/components/ProcessingLoader";
import { fileToDataUrl, processImageBackground } from "@/lib/backgroundRemoval";
import { BatchImageList } from "@/components/batch-image-list";
import { Button } from "@/components/ui/button";
import { Archive, Loader2, RefreshCw } from "lucide-react";

export function BatchProcessor() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [processedResults, setProcessedResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZipping, setIsZipping] = useState(false);

  const handleFilesChange = async (files) => {
    if (!files?.length) {
      setSelectedFiles([]);
      setProcessedResults([]);
      return;
    }

    setSelectedFiles(files);
    setProcessedResults([]);
    setCurrentIndex(0);
    setIsProcessing(true);

    try {
      for (let i = 0; i < files.length; i++) {
        setCurrentIndex(i);
        const file = files[i];
        const dataUrl = await fileToDataUrl(file);

        try {
          const processedUrl = await processImageBackground(file);
          setProcessedResults((prev) => [
            ...prev,
            {
              originalImage: dataUrl,
              processedImage: processedUrl,
              fileName: file.name,
              status: "success",
            },
          ]);
        } catch (error) {
          console.error(`处理图片 ${file.name} 失败:`, error);
          setProcessedResults((prev) => [
            ...prev,
            {
              originalImage: dataUrl,
              fileName: file.name,
              status: "error",
            },
          ]);
        }
      }
    } catch (error) {
      console.error("批量处理失败:", error);
      toast.error("批量处理失败，请重试");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetSelection = () => {
    setSelectedFiles([]);
    setProcessedResults([]);
    setCurrentIndex(0);
  };

  const handleDownloadZip = async () => {
    if (!processedResults.length) return;

    setIsZipping(true);
    toast.info("正在打包图片，请稍候...");

    try {
      // 动态导入jszip库
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      // 创建以日期命名的文件夹
      const date = new Date();
      const folderName = `背景去除_${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const folder = zip.folder(folderName);

      // 添加处理好的图片到压缩包
      const successImages = processedResults.filter(
        (result) => result.status === "success" && result.processedImage,
      );
      const totalImages = successImages.length;

      for (let i = 0; i < totalImages; i++) {
        const result = successImages[i];
        try {
          const response = await fetch(result.processedImage);
          const blob = await response.blob();
          // 获取原始文件名（不带扩展名）
          const originalName =
            result.fileName.substring(0, result.fileName.lastIndexOf(".")) ||
            `image-${i + 1}`;
          const fileName = `${originalName}-无背景.png`;
          folder.file(fileName, blob);

          // 更新打包进度
          if (i % 3 === 0 || i === totalImages - 1) {
            toast.info(`正在打包: ${i + 1}/${totalImages} 张图片`);
          }
        } catch (error) {
          console.error(`添加图片 ${result.fileName} 到压缩包失败:`, error);
        }
      }

      // 生成压缩包
      toast.info("正在生成压缩包，请稍候...");
      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6,
        },
      });

      // 创建下载链接
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `${folderName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("图片已打包下载完成");
    } catch (error) {
      console.error("打包下载失败:", error);
      toast.error("打包下载失败，请重试");
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="relative mx-auto mt-20 px-4 md:mt-16">
      {!selectedFiles.length && !isProcessing ? (
        <ImageUploader onImageSelected={handleFilesChange} multiple={true} />
      ) : (
        <div className="space-y-4">
          {isProcessing && (
            <div className="text-center">
              <ProcessingLoader ShowBg={true} />
              <p className="mt-2 text-sm text-gray-500">
                正在处理第 {currentIndex + 1} 张图片，共{" "}
                {selectedFiles.length} 张
              </p>
            </div>
          )}

          <BatchImageList
            images={processedResults.map((item, i) => ({
              ...item,
              size: selectedFiles[i]?.size || 0,
            }))}
          />

          {!isProcessing && (
            <div className="mt-4 flex items-center justify-center gap-4 text-center">
              <Button
                variant="outline"
                onClick={resetSelection}
                disabled={isZipping}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                重新选择图片
              </Button>
              <Button onClick={handleDownloadZip} disabled={isZipping}>
                {isZipping ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    正在打包...
                  </>
                ) : (
                  <>
                    <Archive className="mr-2 h-4 w-4" />
                    打包下载
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 