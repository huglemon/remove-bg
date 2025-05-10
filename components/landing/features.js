import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ImageIcon, 
  DownloadIcon, 
  SlidersHorizontalIcon, 
  SparklesIcon, 
  UserIcon, 
  CrownIcon, 
  MaximizeIcon, 
  ImageOffIcon 
} from "lucide-react"

const features = [
  {
    title: "一键操作",
    description: "上传图片即可自动移除背景，无需复杂操作，简单高效。",
    icon: ImageIcon,
  },
  {
    title: "效果对比",
    description: "提供处理前后图片对比，直观查看效果，让您对处理结果一目了然。",
    icon: SlidersHorizontalIcon,
  },
  {
    title: "轻松下载",
    description: "一键下载处理后的无背景图片，支持多种格式，方便快捷。",
    icon: DownloadIcon,
  },
  {
    title: "AI 赋能",
    description: "采用先进的 AI 技术，精准识别前景，智能移除背景。",
    icon: SparklesIcon,
  },
  {
    title: "无需登录",
    description: "无需注册账号，打开即用，让您的使用体验更加便捷。",
    icon: UserIcon,
  },
  {
    title: "永久免费",
    description: "单图抠图功能永久免费，不限制使用次数，让您无忧使用。",
    icon: CrownIcon,
  },
  {
    title: "高清处理",
    description: "支持高清图片处理，保持原始画质，细节清晰可见。",
    icon: MaximizeIcon,
  },
  {
    title: "无水印",
    description: "处理后的图片不会添加任何水印，让您的作品保持纯净。",
    icon: ImageOffIcon,
  },
]

export default function Features() {
  return (
    <section className="w-full py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-smiley">
            核心功能
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            简单易用的操作流程，强大的 AI 处理能力，让您的图片处理更加轻松
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <feature.icon className="h-8 w-8 text-amber-500 mb-2" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
