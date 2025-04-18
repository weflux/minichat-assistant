import { View } from "@tarojs/components";
import { Cell, CellGroup, Col, Grid, GridItem, Image, Row, Space } from "@antmjs/vantui";
import { useUserStore } from "src/stores/user-store";
import { useState } from "react";
import Taro, { useDidHide, useDidShow } from "@tarojs/taro";
import ProfileAPI from "src/api/profile"
import MainLayout from "src/layout/main"

const Index = () => {
	const user = useUserStore.use.user();
	const setUser = useUserStore.use.setUser()
	const removeUser = useUserStore.use.removeUser();
	const [profile, setProfile] = useState<{ students: number; posts: number; classes: number }>({
		classes: 0, posts: 0, students: 0
	})


	const handleLogout = () => {
		removeUser();
		Taro.navigateTo({ url:"/pages/login/index" })
	}

	useDidHide(() => {
		// setShowProfileUpdate(false)
	})

	useDidShow(async () => {
		const { students, posts, classes, user: u } = await ProfileAPI.getProfile({})
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

	const handleUpdateProfile = () => {
		Taro.navigateTo({ url: "/pages/profile/update" })
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
						<GridItem onClick={() => Taro.navigateTo({ url: '/pages/student/index' })}
											icon='friends-o' badge={profile.students} text='学生'
						/>
						<GridItem onClick={() => Taro.navigateTo({ url: '/pages/class/index' })}
											icon='award-o' badge={profile.classes} text='课程'
						/>
						<GridItem onClick={() => Taro.navigateTo({ url: '/pages/notification/index' })}
											icon='chat-o' badge={0} text='消息'
						/>
					</Grid>
				</View>
				<View className='mt-6 rounded-md'>
					<CellGroup>
						<Cell title='设置昵称头像' onClick={handleUpdateProfile} />
						{/*<Cell title='同步微信昵称头像' onClick={handleUpdateProfile} />*/}
						<Cell title='退出登录' onClick={handleLogout} />
					</CellGroup>
				</View>
			</View>
		</MainLayout>
	);
};

export default Index;
