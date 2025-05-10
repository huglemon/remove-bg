export default function UserAgreementPage() {
  return (
    <div className="container mx-auto my-10 max-w-4xl rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-8 text-center font-smiley text-5xl font-bold">
        用户协议
      </h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">服务说明</h2>
          <p className="mb-4">
            欢迎使用我们的图片处理工具。本工具提供专业的图片背景移除服务，采用本地AI处理技术，确保您的数据安全。
          </p>
          <div className="mb-4 rounded-lg bg-green-50 p-4">
            <p className="font-medium text-green-800">
              重要声明：单图抠图功能永久免费，无需付费即可使用。所有处理过程都在您的本地设备上进行，确保您的数据安全。
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">服务内容</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>单图抠图：永久免费使用</li>
            <li>本地处理：所有操作在您的设备上完成</li>
            <li>无需注册：直接使用，无需账号</li>
            <li>无广告干扰：纯净的使用体验</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">使用条款</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>本工具仅供个人使用</li>
            <li>用户应确保拥有所处理图片的合法使用权</li>
            <li>不得将本工具用于任何违法用途</li>
            <li>不得对工具进行反向工程或破解</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">免费服务说明</h2>
          <p className="mb-4">我们承诺：</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>单图抠图功能永久免费</li>
            <li>不限制使用次数</li>
            <li>不降低处理质量</li>
            <li>不添加水印</li>
          </ul>
          <div className="mt-4 rounded-lg bg-yellow-50 p-4">
            <p className="font-medium text-yellow-800">
              重要提示：付费功能（批量抠图）与免费功能（单图抠图）使用相同的处理引擎，抠图效果完全一致。付费仅提供批量处理功能，建议您先使用免费功能测试效果后再决定是否购买批量功能。付费后，您将获得30或365天有效期的批量抠图使用权，有效期结束后，您可以继续使用免费功能。本功能不支持退款。
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">使用限制</h2>
          <p className="mb-4">为保障服务质量，我们设置了以下合理限制：</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>单次处理图片大小不超过 20MB</li>
            <li>支持常见图片格式（JPG、PNG、WEBP等）</li>
            <li>建议使用现代浏览器以获得最佳体验</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">免责声明</h2>
          <p className="mb-4">使用本工具时请注意：</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>我们不对处理结果的质量做出保证</li>
            <li>不承担因使用本工具导致的任何损失</li>
            <li>建议在处理重要图片时做好备份</li>
            <li>保留随时修改服务条款的权利</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">知识产权</h2>
          <p className="mb-4">
            本工具的所有权、运营权和一切知识产权均归我们所有。用户不得：
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>复制、修改或创建衍生作品</li>
            <li>反编译、反汇编或进行反向工程</li>
            <li>删除或修改任何版权声明</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">协议更新</h2>
          <p className="mb-4">
            我们可能会不时更新本协议。更新后的协议将在本页面发布，并标注更新日期。继续使用本工具即表示您同意接受更新后的协议。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">联系我们</h2>
          <p>
            如果您对本协议有任何疑问，请随时联系我们。我们将及时回复您的问题。
          </p>
        </section>

        <div className="mt-8 text-center text-sm text-gray-500">
          最后更新日期：{new Date().toLocaleDateString("zh-CN")}
        </div>
      </div>
    </div>
  );
}
