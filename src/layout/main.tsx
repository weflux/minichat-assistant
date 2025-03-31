import Taro from "@tarojs/taro"
import {PropsWithChildren, useEffect} from "react"
import {View} from "@tarojs/components"
import {useUserStore} from "src/stores/user-store"

const MainLayout = (props: PropsWithChildren) => {

  const user = useUserStore.use.user()
  useEffect(() => {
    if (!user?.id)
      Taro.navigateTo({
        url: "/pages/login/index",
      });
  }, [user?.id])

  return (
    <View className='bg-white h-full w-full'>
      {props.children}
    </View>
  )
}

export default MainLayout;
