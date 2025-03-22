import {View} from "@tarojs/components";
import {Button, Image} from "@antmjs/vantui";
import {useUserStore} from "src/stores/user-store";
import {useEffect} from "react";
import Taro from "@tarojs/taro";

const Profile = () => {
  const user = useUserStore.use.user();
  const removeUser = useUserStore.use.removeUser();

  useEffect(() => {
    if (!user?.id)
      Taro.navigateTo({
        url: "/pages/login/index",
      });
  }, [user?.id]);

  const handleUpdateProfile = async () => {

  }

  return (
    <View>
      <View className='mt-10 px-4 w-full flex flex-col items-center'>
        <Image src={user?.avatarUrl ?? ""} round width={200} height={200}/>
        <View className='mt-4'>{user?.displayName}</View>
        {user?.id && (
          <View>
            <Button type='default' onClick={handleUpdateProfile}>获取昵称和头像</Button>
            <Button type='default' onClick={removeUser}>
              退出
            </Button>
          </View>
        )}
      </View>
    </View>
  )
    ;
};

export default Profile;
