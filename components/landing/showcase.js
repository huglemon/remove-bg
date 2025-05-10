import { ImageCompareResult } from "@/components/ImageCompareResult"

const examples = [
  {
    original: "/examples/example1-original.jpeg",
    processed: "/examples/example1-processed.png",
    fileName: "示例1"
  },
  {
    original: "/examples/example2-original.jpeg",
    processed: "/examples/example2-processed.png",
    fileName: "示例2"
  },
  {
    original: "/examples/example3-original.jpeg",
    processed: "/examples/example3-processed.png",
    fileName: "示例3"
  }
]

export default function Showcase() {
  return (
    <section className="w-full py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-smiley">
            效果展示
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            看看我们的 AI 抠图效果如何？滑动滑块查看处理前后的对比效果
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ImageCompareResult
                showControls={false}
                originalImage={example.original}
                processedImage={example.processed}
                fileName={example.fileName}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
