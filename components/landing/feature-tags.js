function FeatureTags() {
  const features = [
    { text: "无需登录", color: "text-amber-800" },
    { text: "全自动", color: "text-blue-800" },
    { text: "高清", color: "text-green-800" },
    { text: "无水印", color: "text-purple-800" },
    { text: "永久免费", color: "text-amber-800" },
  ];

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
      {features.map((feature, index) => (
        <span 
          key={index} 
          className={`inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-sm font-medium ${feature.color} backdrop-blur-sm`}
        >
          {feature.text}
        </span>
      ))}
    </div>
  );
}

export default FeatureTags; 