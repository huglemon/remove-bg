import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "什么是 AI 图片处理？",
      answer: "AI 图片处理是利用人工智能技术对图片进行智能分析和处理的过程。它可以自动识别图片中的元素，进行背景移除、图像增强、风格转换等操作，让图片处理变得更加智能和高效。"
    },
    {
      question: "如何使用你们的服务？",
      answer: "使用我们的服务非常简单。只需上传您想要处理的图片，选择需要的处理功能，我们的 AI 系统会自动完成处理，您可以直接下载处理后的图片。整个过程快速、便捷，无需专业技能。"
    },
    {
      question: "支持哪些图片格式？",
      answer: "我们支持多种常见的图片格式，包括 JPG、PNG、WebP 等。为了获得最佳效果，建议使用清晰度较高的图片，文件大小建议不超过 10MB。"
    },
    {
      question: "处理后的图片质量如何？",
      answer: "我们的 AI 系统经过专业训练，能够保持原始图片的细节和清晰度。处理后的图片质量与原始图片保持一致，同时会根据您的需求进行优化。"
    },
    {
      question: "如何保护我的图片隐私？",
      answer: "我们非常重视用户隐私。所有上传的图片都会经过加密处理，处理完成后会自动从服务器删除。我们不会存储或使用您的图片用于其他目的。"
    }
  ]

  return (
    <section className="w-full py-20 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-smiley">
            常见问题
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            了解更多关于我们服务的信息
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-4 bg-white/80 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-left py-4 hover:no-underline">
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
