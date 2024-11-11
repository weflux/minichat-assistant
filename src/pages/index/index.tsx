import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Button, Image, NoticeBar } from "@antmjs/vantui";
import { useUserStore } from "src/stores/user-store";
import { useCounterStore } from "src/stores/counter-store";
import HomeSwiper from "src/components/home-swiper";
import "./index.less";
export default function Index() {
  const user = useUserStore.use.user();
  const { count, inc, dec } = useCounterStore();
  const handleClick = () => {
    console.log(user);
    if (!user.userName)
      Taro.navigateTo({ url: "/pages/package-a/login/index" });
  };

  return (
    <View className="text-center">
      <NoticeBar
        scrollable
        color="#1989fa"
        background="#ecf9ff"
        text="Index页面的按钮的颜色已经通过全局主题重写覆盖了，参见`src/styles/index.less`。"
      />
      <HomeSwiper />
      <View className="mt-4">
        <View className="mb-3 font-semibold">
          zustand管理counter数据，可在counter页面与首页共享
        </View>
        <Button
          type="primary"
          onClick={() =>
            Taro.navigateTo({ url: "/pages/package-a/counter/index" })
          }
        >
          To CounterPage
        </Button>
        <View className="mt-4 text-center flex items-center justify-between w-full px-8">
          <Button onClick={dec}>Dec</Button>
          <Text>{count}</Text>
          <Button type="primary" onClick={inc}>
            Inc
          </Button>
        </View>
      </View>
      <View className="mt-10">
        <View className="mb-3 font-semibold">
          zustand管理用户登录信息，并持久化存储
        </View>
        <Button type="primary" onClick={handleClick}>
          To LoginPage
        </Button>
        <View className="text-left mt-3 px-4">
          <View>userName:{user?.userName}</View>
          <View>
            userAvatar:
            <Image src={user?.avatar ?? ""} round width={40} height={40} />
          </View>
          <View>role:{user?.role}</View>
        </View>
        <View className="my-1 font-semibold">
          首次登录后可在storage中观察到key为`storage-user`的数据
        </View>
      </View>
    </View>
  );
}
