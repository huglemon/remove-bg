import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onImageSelected: (files: File[] | null) => void;
  multiple?: boolean;
}

export function ImageUploader({
  onImageSelected,
  multiple = false,
}: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length) {
        onImageSelected(multiple ? acceptedFiles : [acceptedFiles[0]]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      } bg-white p-10 md:p-20 shadow-md transition-colors`}
    >
      <input {...getInputProps()} />
      <Button
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        className="mb-4 h-12 px-8 text-base"
      >
        <SparklesIcon className="mr-2 h-5 w-5" />
        {multiple ? "选择多张图片" : "选择图片"}
      </Button>
      <p className="text-gray-500">
        {multiple ? "或拖放多张图片至此处" : "或拖放图片至此处"}
      </p>
    </div>
  );
}
