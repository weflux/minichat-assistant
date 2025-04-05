import { Text, Video, View } from "@tarojs/components"
import { Button, Col, Empty, Row, ShareSheet, Toast } from "@antmjs/vantui"
import { useRouter } from "@tarojs/taro"
import { useEffect, useState } from "react"
import { PostDetail } from "src/api/types/posts"
import PostsAPI from "src/api/posts"

const shareOptions = [
	{
		name: '微信',
		icon: 'wechat',
		openType: 'share',
	}
]

const Index = () => {
	const router = useRouter()
	const { params } = router;
	const postId = params.id
	const [data, setData] = useState<PostDetail>({})
	const [showShareSheet, setShowShareSheet] = useState<boolean>(false)
	useEffect(() => {
		console.log("post_id", postId)
		if (postId) {
			PostsAPI.get(postId)
				.then(res => {
					setData(res)
				})
		}
	}, [postId]);

	const handleOpenShareSheet = () => {
		setShowShareSheet(true)
	}

	const handleShare = (target: string) => {
		if (target === "wechat") {
			handleWechatShare()
		}
	}
	const handleWechatShare = () => {

	}
	return (
		<View className='w-full'>
			{data && data?.post ? (
				<View>
					<Row>
						<Col span={24}>
							{data.post.type == 1 ? (
								<View>

									<Video className='w-full' showFullscreenBtn autoPauseIfNavigate
												 src={data.post.attachment_url}
									/>
									<Text>
										{data.post?.content}
									</Text>
								</View>
							) : (
								<View>
									<Text>
										{data.post?.content}
									</Text>
								</View>
							)}
						</Col>
						<Col span={24}>
							<Button type='primary' plain onClick={handleOpenShareSheet}>分享</Button>
						</Col>
					</Row>

					<ShareSheet
						show={showShareSheet}
						title='立即分享给好友'
						options={shareOptions}
						onSelect={e => handleShare(e.detail.name)}
						onClose={() => setShowShareSheet(false)}
					/>
					<Toast />
				</View>
			) : (
				<Empty description='暂无内容' />
			)}
		</View>
	)
}

export default Index
