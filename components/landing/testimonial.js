import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "张小明",
    avatar: "/avatars/user1.jpeg",
    role: "设计师",
    content: "这个工具太棒了！处理速度很快，效果也很专业。作为一名设计师，经常需要处理图片背景，这个工具帮我节省了大量时间。",
    rating: 5,
    date: "2024-03-15"
  },
  {
    name: "李华",
    avatar: "/avatars/user2.jpeg",
    role: "电商店主",
    content: "简单易用，效果出众。我的产品图片处理效率提升了很多，强烈推荐给需要处理商品图片的朋友们！",
    rating: 5,
    date: "2024-03-14"
  },
  {
    name: "王芳",
    avatar: "/avatars/user3.jpeg",
    role: "摄影师",
    content: "作为一名摄影师，经常需要处理人像照片。这个工具的抠图效果非常自然，边缘处理得很细腻，完全满足我的专业需求。",
    rating: 5,
    date: "2024-03-13"
  },
  {
    name: "陈明",
    avatar: "/avatars/user4.jpeg",
    role: "学生",
    content: "免费又好用！作为学生党，这个工具帮我解决了很多作业和项目中的图片处理需求，非常感谢！",
    rating: 5,
    date: "2024-03-12"
  },
  {
    name: "刘洋",
    avatar: "/avatars/user5.jpeg",
    role: "自媒体创作者",
    content: "处理速度快，效果专业，而且完全免费！这对于我们这些需要频繁处理图片的自媒体创作者来说简直是福音。",
    rating: 5,
    date: "2024-03-11"
  },
  {
    name: "赵静",
    avatar: "/avatars/user6.jpeg",
    role: "UI设计师",
    content: "界面简洁，操作直观，处理效果也很棒。作为一名UI设计师，这个工具已经成为了我的必备工具之一。",
    rating: 5,
    date: "2024-03-10"
  }
]

export default function Testimonial() {
  return (
    <section className="w-full bg-background/50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-smiley">
            用户评价
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            听听用户们怎么说，了解他们使用我们工具的真实体验
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-2">{testimonial.content}</p>
                <p className="text-sm text-gray-400">{testimonial.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}