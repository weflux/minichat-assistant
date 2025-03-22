import {View} from "@tarojs/components";
import {Cell, CellGroup, Col, Divider, Icon, Image, Row} from "@antmjs/vantui";
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
      <View className='m-2'>
        <View className='bg-white rounded-md'>
          <Row className='m-2 flex items-center'>
            <Col span={4}>
              <Image src={user?.avatarUrl ?? ""} round width={100} height={100}
                className='flex items-center justify-center'
              />
            </Col>
            <Col span={20}>
              <View className='flex items-center'>
                <Row>
                  <Col span={20}>
                    <View>{user?.displayName}</View>
                  </Col>
                  <Col span={2}>
                    <Icon name='replay' onClick={handleUpdateProfile} />
                  </Col>
                </Row>
              </View>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={8}>
              <CellGroup title='学生'>
                <Cell title='1' isLink linkType='navigateTo' url='/pages/student/index' />
              </CellGroup>
            </Col>
            <Col span={8}>
              <CellGroup title='内容'>
                <Cell title='10' isLink linkType='navigateTo' url='/pages/content/index' />
              </CellGroup>
            </Col>
            <Col span={8}>
              <CellGroup title='课程'>
                <Cell title='2' isLink linkType='navigateTo' url='/pages/class/index' />
              </CellGroup>
            </Col>
          </Row>
        </View>
        <View className='mt-6 rounded-md'>
          <CellGroup>
            <Cell title='退出登录' onClick={handleLogout} />
          </CellGroup>
        </View>
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
    </View>
  )
    ;
};

export default Profile;
