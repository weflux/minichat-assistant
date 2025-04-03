import { Text, Video, View } from "@tarojs/components"
import { Col, Empty, Row } from "@antmjs/vantui"
import { useRouter } from "@tarojs/taro"
import { useEffect, useState } from "react"
import { PostDetail } from "src/api/types/posts"
import PostsAPI from "src/api/posts"


const Index = () => {
	const router = useRouter()
	const { params } = router;
	const postId = params.id
	const [data, setData] = useState<PostDetail>({})
	useEffect(() => {
		console.log("post_id", postId)
		PostsAPI.get(postId!)
			.then(res => {
				setData(res)
			})
	}, [postId]);
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
					</Row>
				</View>
			) : (
				<Empty description='暂无内容' />
			)}
		</View>
	)
}

export default Index
