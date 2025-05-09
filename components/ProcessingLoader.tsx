import { Sparkles } from "lucide-react";

export function ProcessingLoader({ ShowBg, title = "正在处理图片", text = "AI 正在移除背景..." }: { ShowBg: boolean, title: string, text: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-transparent p-6 ${ShowBg ? "rounded-xl border-2 border-dashed bg-white shadow-md py-20" : "aspect-video bg-transparent"}`}
    >
      <div className="relative mb-3">
        <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-blue-400/70 to-violet-400/70 opacity-70 blur-sm"></div>
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-50/70 to-violet-50/70 backdrop-blur-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <div className="flex items-center">
        <Sparkles className="mr-1 h-4 w-4 text-blue-500" />
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
}
