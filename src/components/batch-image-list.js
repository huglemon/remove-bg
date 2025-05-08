import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Image as ImageIcon, Clipboard } from "lucide-react"
import { ImageCompareResult } from "@/components/ImageCompareResult"
import { toast } from "sonner"

function formatSize(size) {
  if (size > 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + ' MB'
  if (size > 1024) return (size / 1024).toFixed(2) + ' KB'
  return size + ' B'
}

function getDownloadName(fileName, ext = 'png') {
  if (!fileName) return `bg-removed-image.${ext}`
  const base = fileName.replace(/\.[^.]+$/, '')
  return `bg-removed-${base}.${ext}`
}

const iconClass =
  "transition-colors text-gray-400 group-hover:text-primary group-active:scale-95"

export function BatchImageList({ images }) {
  const [previewIdx, setPreviewIdx] = useState(null)

  function handlePreview(idx) {
    setPreviewIdx(idx)
  }

  function handleClosePreview() {
    setPreviewIdx(null)
  }

  function handleDownload(url, fileName) {
    const link = document.createElement("a")
    link.href = url
    link.download = getDownloadName(fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function handleCopy(url) {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ])
        toast.success("图片已复制到剪贴板")
      })
      .catch(err => {
        console.error("复制失败:", err)
        toast.error("复制失败，请重试")
      })
  }

  return (
    <div className="flex aspect-video flex-col items-center justify-start rounded-xl border-2 border-dashed p-6 shadow-md transition-colors md:p-8">
      <table className="min-w-full text-left text-sm text-gray-500">
        <thead>
          <tr className="border-b border-gray-300 text-base text-gray-300">
            <th className="px-4 py-2 font-medium">编号</th>
            <th className="px-4 py-2 font-medium">文件名</th>
            <th className="px-4 py-2 font-medium">大小</th>
            <th className="px-4 py-2 font-medium text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          {images.map((img, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-100/5 transition-colors">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2">{img.fileName}</td>
              <td className="px-4 py-2">{formatSize(img.size)}</td>
              <td className="px-4 py-2">
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="group rounded-md p-2 hover:bg-gray-100/70 focus:outline-none"
                    onClick={() => handleDownload(img.processedImage || img.originalImage, img.fileName)}
                    title="下载"
                  >
                    <Download size={20} strokeWidth={1.8} className={iconClass + " group-hover:text-blue-500"} />
                  </button>
                  <button
                    className="group rounded-md p-2 hover:bg-gray-100/70 focus:outline-none"
                    onClick={() => handleCopy(img.processedImage || img.originalImage)}
                    title="复制图片链接"
                  >
                    <Clipboard size={20} strokeWidth={1.8} className={iconClass + " group-hover:text-yellow-500"} />
                  </button>
                  <button
                    className="group rounded-md p-2 hover:bg-gray-100/70 focus:outline-none"
                    onClick={() => handlePreview(idx)}
                    title="预览对比"
                  >
                    <ImageIcon size={20} strokeWidth={1.8} className={iconClass + " group-hover:text-green-500"} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Dialog 预览对比 */}
      {previewIdx !== null && images[previewIdx] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative rounded-lg bg-white p-6 shadow-xl max-w-2xl w-full">
            <ImageCompareResult
              originalImage={images[previewIdx].originalImage}
              processedImage={images[previewIdx].processedImage}
              fileName={images[previewIdx].fileName}
              onReset={handleClosePreview}
            />
            <div className="mt-2 flex justify-center">
              <Button onClick={handleClosePreview} className="px-8">关闭</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 