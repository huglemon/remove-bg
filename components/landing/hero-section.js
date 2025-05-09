import { ImageSingleUploader } from "@/components/ImageSingleUploader";
import FeatureTags from "./feature-tags";

function HeroSection() {
  return (
    <section className="relative border-b border-border bg-background/50 pb-24 pt-16">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* 左侧：标题和文案 */}
          <div className="text-center md:text-left">
            <h1 className="font-smiley text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              智能移除图片
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                背景
              </span>
              <br />
              100%全自动
            </h1>
            <p className="mt-6 text-balance text-lg leading-relaxed text-gray-700">
              <strong>轻松、快速</strong>地移除图片背景，立即获得专业效果。
              无需复杂技能，只需<strong>上传一张图片</strong>
              ，AI大模型技术将为您完成剩余工作。
            </p>
            <FeatureTags />
          </div>

          {/* 右侧：上传组件 */}
          <div className="relative rounded-xl bg-white/70 p-4 shadow-lg shadow-black/5 backdrop-blur-sm md:p-6">
            <ImageSingleUploader />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection; 