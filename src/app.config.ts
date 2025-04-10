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
			// {
			//   pagePath: 'pages/growth/index',
			//   iconPath: 'assets/tabbar/selection.png',
			//   selectedIconPath: 'assets/tabbar/selection_fill.png',
			//   text: '成长',
			// },
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
		"pages/profile/update", // 更新头像和昵称
		"pages/login/index", //登录页
		// "pages/my-posts/index", // 我的内容
		"pages/post/index", // 内容详情
		"pages/editor/index", // 发布
		"pages/editor/video", // 视频
		"pages/class/index", // 课程
		"pages/class/create", // 添加课程
		"pages/student/index", // 学生
		"pages/student/create", // 新增学生
		"pages/growth/index", // 成长系统
		"pages/notification/index", // 通知系统
	],
	subPackages: [
		{
			root: "pages/package-a",
			pages: [
				"counter/index", // 计数页
			],
		},
	],
	permission: {
	},
	window: {
		enablePullDownRefresh: true, // 默认开启下拉刷新
		backgroundTextStyle: "light",
		navigationBarBackgroundColor: "#fff",
		navigationBarTitleText: "课后打卡助手", // 默认导航栏标题
		navigationBarTextStyle: "black",
	},
	lazyCodeLoading: "requiredComponents"
});
