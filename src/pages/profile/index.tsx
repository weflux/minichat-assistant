import {View} from "@tarojs/components";
import {Cell, CellGroup, Col, Grid, GridItem, Icon, Image, Row} from "@antmjs/vantui";
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
          <Grid columnNum={3}>
            <GridItem icon='smile-o' text='1' />
            <GridItem icon='fire-o' text='29' />
            <GridItem icon='award-o' text='3' />
          </Grid>
        </View>
        <View className='mt-6 rounded-md'>
          <CellGroup>
            <Cell title='退出登录' onClick={handleLogout} />
          </CellGroup>
        </View>
      </View>
    </View>
  )
    ;
};

export default Profile;
