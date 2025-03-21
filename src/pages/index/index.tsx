import Taro from "@tarojs/taro";
import {Button, View} from "@tarojs/components";
import {Image, NoticeBar} from "@antmjs/vantui";
import {useUserStore} from "src/stores/user-store";
// import {useCounterStore} from "src/stores/counter-store";
import HomeSwiper from "src/components/home-swiper";
import "./index.less";

export default function Index() {
  const user = useUserStore.use.user();
  // const {count, inc, dec} = useCounterStore();
  const handleGetUserProfile = async (e) => {
    const {userInfo} = await Taro.getUserProfile({
      desc: "用于完善用户资料"
    })
    console.log("user", userInfo)
  };

  return (
    <View className='text-center'>
      <NoticeBar
        scrollable
        color='#1989fa'
        background='#ecf9ff'
        text='Index页面的按钮的颜色已经通过全局主题重写覆盖了，参见`src/styles/index.less`。'
      />
      <HomeSwiper/>
      <View className='mt-4'>
        <View className='mb-3 font-semibold'>
          zustand管理counter数据，可在counter页面与首页共享
        </View>
      </View>

      <View className='mt-10'>

        <Button type='primary' bindtap='getUserProfile' onClick={handleGetUserProfile}>
          获取头像昵称
        </Button>
        <View className='text-left mt-3 px-4'>
          <View>用户名: {user?.displayName}</View>
          <View>
            头像:
            <Image src={user?.avatarUrl ?? ""} round width={40} height={40}/>
          </View>
          <View>role:{user?.role}</View>
        </View>
      </View>
    </View>
  );
}
