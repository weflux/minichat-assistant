import {View} from "@tarojs/components";
import {Cell, CellGroup, Col, Grid, GridItem, Image, Row, Space} from "@antmjs/vantui";
import {useUserStore} from "src/stores/user-store";
import {useState} from "react";
import Taro, {useDidShow} from "@tarojs/taro";
import UsersAPI from "src/api/auth"
import ProfileAPI from "src/api/profile"
import MainLayout from "src/layout/main"

const Profile = () => {
  const user = useUserStore.use.user();
  const setUser = useUserStore.use.setUser()
  const removeUser = useUserStore.use.removeUser();
  const [profile, setProfile] = useState<{ students: number, posts: number, classes: number }>({
    classes: 0, posts: 0, students: 0
  })

  const handleLogout = () => {
    removeUser();
  }

  useDidShow(async () => {
    const {students, posts, classes, user: u} = await ProfileAPI.getProfile({})
    setProfile({
      students: students,
      posts: posts,
      classes: classes,
    })
    setUser({
      id: u.id,
      name: u.name,
      avatarUrl: u.avatar_url,
      displayName: u.display_name,
      role: "user"
    })
  })

  const handleUpdateProfile = async () => {
    const {userInfo} = await Taro.getUserProfile({
      desc: "用于完善用户资料"
    })
    console.log("user_info", userInfo)
    const newUser = await UsersAPI.uploadProfile({
      display_name: userInfo.nickName,
      avatar_url: userInfo.avatarUrl,
      copy_url: true,
      ext: "jpg"
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
    <MainLayout>
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
                <Space>
                  <View className='font-bold text-gray-800'>{user?.displayName}</View>
                  <View className='font-bold text-gray-600'>（{user?.name}）</View>
                </Space>
              </View>
            </Col>
          </Row>
          <Grid columnNum={3}>
            <GridItem onClick={() => Taro.navigateTo({url: '/pages/student/index'})}>
              <Cell title='学生' value={profile.students}/>
            </GridItem>
            <GridItem onClick={() => Taro.navigateTo({url: '/pages/post/index'})}>
              <Cell title='内容' value={profile.posts}/>
            </GridItem>
            <GridItem onClick={() => Taro.navigateTo({url: '/pages/class/index'})}>
              <Cell title='课程' value={profile.classes}/>
            </GridItem>
          </Grid>
        </View>
        <View className='mt-6 rounded-md'>
          <CellGroup>
            <Cell title='同步微信昵称头像' onClick={handleUpdateProfile}/>
            <Cell title='退出登录' onClick={handleLogout}/>
          </CellGroup>
        </View>
      </View>
    </MainLayout>
  );
};

export default Profile;
