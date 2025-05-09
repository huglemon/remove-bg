import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ProcessingErrorProps {
  imageUrl: string;
  onReset: () => void;
}

export function ProcessingError({ imageUrl, onReset }: ProcessingErrorProps) {
  return (
    <div className="overflow-hidden rounded-lg">
      <div className="bg-red-50/70 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
          <h3 className="font-semibold text-red-700">处理失败</h3>
        </div>
        <p className="mt-1 text-sm text-red-600">
          背景移除处理失败，请检查图片或稍后重试。您也可以尝试上传其他图片。
        </p>
      </div>
      
      <div className="p-4">
        <div className="flex justify-center overflow-hidden rounded-md bg-gray-50/70 backdrop-blur-sm p-2 shadow-sm">
          <Image
            src={imageUrl}
            alt="原始图片"
            width={500}
            height={300}
            className="max-h-[300px] object-contain"
            unoptimized
          />
        </div>
      </div>
      
      <div className="bg-gray-50/70 backdrop-blur-sm p-4">
        <Button 
          onClick={onReset} 
          className="w-full bg-gradient-to-r from-blue-600/90 to-violet-600/90 backdrop-blur-sm hover:from-blue-700/90 hover:to-violet-700/90"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          重新上传图片
        </Button>
      </div>
    </div>
  );
}
