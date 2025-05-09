"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "@/components/ImageUploader";
import { ProcessingLoader } from "@/components/ProcessingLoader";
import HomepageImage1 from "@/components/images/homepage-image-1";
import HomepageImage2 from "@/components/images/homepage-image-2";
import { ImageCompareResult } from "@/components/ImageCompareResult";
import { ProcessingError } from "@/components/ProcessingError";
import { fileToDataUrl, processImageBackground } from "@/lib/backgroundRemoval";
import { BatchImageList } from "@/components/batch-image-list";

export default function BatchPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [processedResults, setProcessedResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mx-auto mt-4 md:mt-6">
        <h1 className="text-center font-dingtalk text-4xl font-bold md:text-5xl">
          批量移除图片背景
        </h1>
        <p className="mx-auto mt-4 max-w-md text-balance text-center leading-snug md:text-lg md:leading-snug">
          选择多张<strong>图片</strong>，一键批量移除背景。
        </p>

        <div className="relative mx-auto mt-20 px-4 md:mt-16">
          <div className="pointer-events-none absolute left-[-40px] top-[-185px] flex w-[200px] items-center md:-left-[calc(min(30vw,350px))] md:-top-20 md:w-[390px]">
            <HomepageImage1 />
          </div>
          <div className="pointer-events-none absolute right-[20px] top-[-110px] flex w-[70px] justify-center md:-right-[calc(min(30vw,350px))] md:-top-5 md:w-[390px]">
            <HomepageImage2 />
          </div>
          {!selectedFiles.length && !isProcessing ? (
            <ImageUploader
              onImageSelected={handleFilesChange}
              multiple={true}
            />
          ) : (
            <div className="space-y-4">
              {isProcessing && (
                <div className="text-center">
                  <ProcessingLoader />
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
                <div className="mt-4 text-center">
                  <button
                    onClick={resetSelection}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-250 bg-white px-2 py-1.5 text-xs text-gray-300 shadow transition hover:bg-white/75 md:rounded-xl md:px-4 md:text-sm"
                  >
                    重新选择图片
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
