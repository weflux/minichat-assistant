export default defineAppConfig({
  tabBar: {
    color: '#666666',
    selectedColor: '#4965f2',
    backgroundColor: '#fefefe',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home_fill.png',
        text: '首页',
      },
      {
        pagePath: 'pages/growth/index',
        iconPath: 'assets/tabbar/selection.png',
        selectedIconPath: 'assets/tabbar/selection_fill.png',
        text: '成就',
      },
      {
        pagePath: 'pages/profile/index',
        iconPath: 'assets/tabbar/profile.png',
        selectedIconPath: 'assets/tabbar/profile_fill.png',
        text: '我的',
      },
    ],
  },
  pages: [
    "pages/index/index", // 首页
    "pages/profile/index", // 我的
    "pages/login/index", //登录页
    "pages/post/index", // 发布
    "pages/editor/index", // 发布
    "pages/content/index", // 内容
    "pages/class/index", // 课程
    "pages/student/index", // 学生
    "pages/growth/index", // 学生
  ],
  subPackages: [
    {
      root: "pages/package-a",
      pages: [
        "counter/index", // 计数页
      ],
    },
  ],
  window: {
    enablePullDownRefresh: true, // 默认开启下拉刷新
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "课外小助教", // 默认导航栏标题
    navigationBarTextStyle: "black",
  },
  lazyCodeLoading: "requiredComponents"
});
