import { BaseEventOrig, Input, View } from "@tarojs/components"
import { useState } from "react"
import { useUserStore } from "src/stores/user-store"
import FilesAPI from "src/api/files"
import { getFileExt } from "src/utils/file"
import Taro from "@tarojs/taro"
import UsersAPI from "src/api/auth"
import { Button, Form, FormItem, Image } from "@antmjs/vantui"

const Update = () => {
	const [nickName, setNickName] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");

	const setUser = useUserStore.use.setUser()

	const uploadAvatar = async (filePath: string, cb: (fileUrl: string) => void) => {
		const res = await FilesAPI.getPreSignedUrl({
			category: "avatar",
			ext: getFileExt(filePath) || "jpg",
		})

		const wxfs = Taro.getFileSystemManager()
		wxfs.readFile({
			filePath: filePath,
			success: function (succ) {
				// setLoading(true)
				Taro.request({
					url: res.pre_signed_url,
					method: "PUT",
					header: { "content-type": "application/octet-stream" },
					data: succ.data,
					success: function (res2) {
						console.log("upload success", res2)
						if (res2.statusCode === 200) {
							cb(res.exposed_url)
						} else {
							Taro.showToast({ title: '头像上传失败' })
							console.error(res2);
						}
					}
				})
			}
		})
	}

	const handleUpdateProfile = async () => {
		console.log("user_nickname", nickName, "avatar_url", avatarUrl);
		const newUser = await UsersAPI.uploadProfile({
			display_name: nickName,
			avatar_url: avatarUrl,
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

		Taro.navigateBack({
			delta: 1,
			fail: () => Taro.redirectTo({ url: '/pages/profile/index' })
		})
	}

	const handleChooseAvatar = async (e: BaseEventOrig<any>) => {
		console.log("click event", e)
		await uploadAvatar(e.detail.avatarUrl, (fileUrl: string) => {
			setAvatarUrl(fileUrl);
		})
	}

	return (
		<View>
			<Form>
				<FormItem label='头像' name='avatarUrl'>
					<Image className='avatar flex items-center' src={avatarUrl} height={100} width={100} />
					<Button openType='chooseAvatar' type='primary' size='small' onChooseAvatar={handleChooseAvatar}>选择头像</Button>
				</FormItem>
				<FormItem label='昵称' name='displayName'>
					<Input type='nickname' value={nickName} placeholder='点击输入昵称' onBlur={e => setNickName(e.detail.value)} />
				</FormItem>
				<Button className='fixed w-full bottom-4' type='primary' onClick={handleUpdateProfile}>提交</Button>
			</Form>
		</View>
	)
}

export default Update;
