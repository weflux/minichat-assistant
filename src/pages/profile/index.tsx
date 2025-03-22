import {View} from "@tarojs/components";
import {Button, Cell, CellGroup, Col, Image, Row} from "@antmjs/vantui";
import {useUserStore} from "src/stores/user-store";
import {useEffect} from "react";
import Taro from "@tarojs/taro";
import UserAPI from "src/api/auth"

const Profile = () => {
  const user = useUserStore.use.user();
  const setUser = useUserStore.use.setUser()
  const removeUser = useUserStore.use.removeUser();

  const handleLogout = () => {
    removeUser();
  }

  useEffect(() => {
    if (!user?.id)
      Taro.navigateTo({
        url: "/pages/login/index",
      });
  }, [user?.id]);

  const handleUpdateProfile = async () => {
    const {userInfo} = await Taro.getUserProfile({
      desc: "用于完善用户资料"
    })
    console.log("user_info", userInfo)
    const newUser = await UserAPI.uploadProfile({
      display_name: userInfo.nickName,
      avatar_url: userInfo.avatarUrl,
    })
    console.log("user", newUser)
    setUser({
      id: newUser.id,
      name: newUser.name,
      avatarUrl: newUser.avatar_url,
      displayName: newUser.display_name,
      role: "user"
    })
  }

  return (
    <View>
      <View className='m-2 bg-white rounded-md'>
        <Row>
          <Col span={4}>
            <View className='flex items-center justify-center'>
              <Image src={user?.avatarUrl ?? ""} round width={100} height={100}/>
            </View>
          </Col>
          <Col span={20}>
            <Row>
              <Col span={24}>
                <View className='mt-4'>{user?.displayName}</View>
              </Col>
              <Col span={24}>
                <Button plain type='primary' onClick={handleUpdateProfile}>点击更新个人信息</Button>
              </Col>
            </Row>
          </Col>
          {/*<Col span={2}>*/}
          {/*  <Icon />*/}
          {/*</Col>*/}
        </Row>
      </View>
      <CellGroup>
        <Cell title='点击退出' onClick={handleLogout} />
      </CellGroup>
      {/*<View className='mt-10 px-4 w-full flex flex-col items-center'>*/}
      {/*  <Image src={user?.avatarUrl ?? ""} round width={200} height={200}/>*/}
      {/*  <View className='mt-4'>{user?.displayName}</View>*/}
      {/*  {user?.id && (*/}
      {/*    <View>*/}
      {/*      <Button type='default' onClick={handleUpdateProfile}>获取昵称和头像</Button>*/}
      {/*      <Button type='default' onClick={removeUser}>*/}
      {/*        退出*/}
      {/*      </Button>*/}
      {/*    </View>*/}
      {/*  )}*/}
      {/*</View>*/}
    </View>
  )
    ;
};

export default Profile;
