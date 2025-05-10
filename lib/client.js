const base = {
  name: "乘风出海 - 智能外贸生态服务平台",
  description:
    "乘风inWind，是莫恩凯登（邯郸）科技有限公司携手石家庄万符网络科技有限公司倾力打造的：全新一代智能外贸生态服务平台。其中，包括支持140余种语言的多语言企业独立站、海外营销推广服务和专为外贸企业定制的CRM客户管理系统！李白有诗称：大鹏一日乘风起，扶摇直上九万里！乘风，意为助力中国企业乘风出海、破浪前行，为中国企业出海提供技术、营销等全方面服务。",
  url: "https://cms.inwind.cn",
  ogImage: "https://cms.inwind.cn/og.png",
  metadataBase: "/",
  keywords: [
    "乘风",
    "多语言",
    "外贸",
    "独立站",
    "建站",
    "人工智能",
    "ChatGPT",
    "AI",
    "外贸CRM",
    "外贸CMS",
    "外贸培训",
    "外贸自媒体",
  ],
  authors: [
    {
      name: "huglemon",
      url: "https://www.huglemon.com",
    },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  navLinks: [
    {
      name: "独立站",
      url: "/b2b",
      items: [
        { name: "B2B建站", url: "/b2b" },
        { name: "模板展示", url: "/b2b/template" },
      ],
    },
    {
      name: "免费工具",
      url: "https://inwind.cn/tools",
      items: [
        { name: "万能导航", url: "https://inwind.cn/tools" },
        { name: "免费抠图", url: "/" },
        { name: "批量AI抠图", url: "/batch" },
        { name: "全球时区查询", url: "https://whenthey.work" },
      ],
    },
    {
      name: "个人中心",
      url: "/dashboard",
    },
  ],
  aboutLinks: [
    { name: "用户协议", url: "/agreement/user" },
    { name: "隐私政策", url: "/agreement/privacy" },
    { name: "关于我们", url: "/about" },
    { name: "联系我们", url: "/contact" },
  ],
  inwindLinks: [
    {
      name: "独立站",
      url: "https://inwind.cn/b2b",
      items: [
        { name: "B2B建站", url: "https://inwind.cn/b2b" },
        { name: "模板展示", url: "https://inwind.cn/b2b/template" },
      ],
    },
    { name: "外贸培训", url: "https://inwind.cn/lesson" },
    { name: "视频翻译", url: "https://inwind.cn/ai-boss" },
    { name: "关于乘风", url: "https://inwind.cn/about" },
    { name: "联系乘风", url: "https://inwind.cn/contact" },
  ],
  toolsLinks: [
    { name: "万能导航", url: "https://inwind.cn/tools" },
    { name: "免费抠图", url: "/" },
    { name: "批量AI抠图", url: "/batch" },
    { name: "全球时区查询", url: "https://whenthey.work" },
  ],
  friendLinks: [
    { name: "外贸工具", url: "https://inwind.cn/tools" },
    { name: "Jasmine Business", url: "https://www.jasminebusiness.com" },
    { name: "Huglemon", url: "https://www.huglemon.com" },
  ],
};

export const SiteConfig = {
  ...base,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: base.url,
    image: [`${base.url}/og.png`],
    title: base.name,
    description: base.description,
    siteName: base.name,
  },
  twitter: {
    card: "summary_large_image",
    title: base.name,
    url: base.url,
    description: base.description,
    images: [`${base.url}/og.png`],
    creator: base.name,
  },
};
