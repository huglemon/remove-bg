export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-md p-8 my-10">
      <h1 className="text-5xl font-bold mb-8 text-center font-smiley">隐私政策</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">数据安全承诺</h2>
          <p className="mb-4">
            我们非常重视您的隐私和数据安全。本工具采用本地处理方式，所有图片处理均在您的设备上完成。
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-800 font-medium">
              重要声明：我们不会上传、存储或分享您的任何图片数据。所有处理过程都在您的本地设备上进行，确保您的数据安全。
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">数据处理说明</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>所有图片处理均在您的设备本地完成</li>
            <li>不会将您的图片上传到任何服务器</li>
            <li>不会存储您的任何图片数据</li>
            <li>不会收集或分享您的个人信息</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookie 使用说明</h2>
          <p className="mb-4">
            本工具仅使用必要的功能性 Cookie，用于：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>记住您的语言偏好设置</li>
            <li>保存您的工具使用偏好</li>
            <li>优化本地处理性能</li>
          </ul>
          <p className="mt-4">
            我们不会使用任何用于跟踪或分析的 Cookie。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">用户权利</h2>
          <p className="mb-4">作为用户，您拥有以下权利：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>随时删除本地存储的偏好设置</li>
            <li>选择是否接受 Cookie</li>
            <li>随时停止使用本工具</li>
            <li>了解数据处理方式</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">技术实现</h2>
          <p className="mb-4">
            本工具使用先进的本地AI模型进行图片处理，所有计算都在您的设备上完成，无需网络连接即可使用。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">隐私保护措施</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>本地处理：所有操作在您的设备上完成</li>
            <li>无数据上传：不会将任何数据发送到外部服务器</li>
            <li>无数据存储：处理完成后不会保存任何图片数据</li>
            <li>无数据收集：不会收集任何用户信息</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">未成年人保护</h2>
          <p className="mb-4">
            本工具适合所有年龄段用户使用。由于所有处理都在本地完成，不会收集任何个人信息，因此特别适合未成年人使用。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">政策更新</h2>
          <p className="mb-4">
            我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并标注更新日期。建议您定期查看本页面以了解最新政策。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">免责声明</h2>
          <p className="mb-4">
            本工具仅供个人使用，用户应确保拥有所处理图片的合法使用权。我们不对用户使用本工具处理图片的合法性负责。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
          <p>
            如果您对我们的隐私政策有任何疑问，请随时联系我们。我们致力于保护您的隐私和数据安全。
          </p>
        </section>

        <div className="text-sm text-gray-500 mt-8 text-center">
          最后更新日期：{new Date().toLocaleDateString('zh-CN')}
        </div>
      </div>
    </div>
  )
}
