import { Text, Video, View } from "@tarojs/components";
import {
	Button,
	Cell,
	Col,
	Ellipsis,
	Empty,
	Icon,
	Image,
	InfiniteScroll,
	InfiniteScrollInstance,
	InfiniteScrollProps,
	IPullToRefreshProps,
	PullToRefresh,
	Row,
	Search,
	Space,
	Sticky,
	Toast,
} from "@antmjs/vantui";
import Taro, { useDidHide } from "@tarojs/taro"
import { useEffect, useRef, useState } from "react"
import FilesAPI from "src/api/files"
import { PostItem } from "src/api/types/posts"
import PostsAPI from "src/api/posts"
import MainLayout from "src/layout/main"
import { Student, useStudentStore } from "src/stores/student-store"
import StudentsAPI from "src/api/students"
import { formatTimestamp } from "src/utils/time"
import { getFileExt } from "src/utils/file"


export default function Index() {

	const setStudents = useStudentStore.use.setStudents()
	const student = useStudentStore.use.selected()()
	const selectedStudentId = useStudentStore.use.selectedId()
	const setSelectedId = useStudentStore.use.setSelectedId()

	const refreshStudents = () => {
		StudentsAPI.getStudents().then(data => {
			const list: Student[] = []
			data.list.forEach(it => {
				list.push({
					id: it.id,
					name: it.name
				})
			})
			setStudents(list)
			if ((!selectedStudentId || !student) && list.length > 0) {
				setSelectedId(list[0].id)
			}
		})
	}

	useEffect(() => {
		refreshStudents()
	}, []);

	const infiniteScrollInstance = useRef<InfiniteScrollInstance>()
	const [postList, setPostList] = useState<PostItem[]>([])

	// const [showPost, setShowPost] = useState(false);
	const [cursor, setCursor] = useState<string>('0')
	const [search, setSearch] = useState<string>('')

	const loadMore: InfiniteScrollProps['loadMore'] = async () => {
		console.log("loadMore")
		return new Promise(async resolve => {
			try {
				const { list, max_cursor, limit, size } = await PostsAPI.getHomeList({ max_cursor: cursor, search: '' })
				if (size > 0) {
					const newList = postList.concat(list)
					setPostList(newList)
					setCursor(max_cursor)
				}
				resolve(size < limit ? 'complete' : 'loading')
			} catch (err) {
				console.log(err)
				resolve("error")
			}
		})
	}

	const onRefresh: IPullToRefreshProps['onRefresh'] = async () => {
		console.log("refresh")
		return new Promise(async resolve => {
			const { list, max_cursor, size } = await PostsAPI.getHomeList({ max_cursor: '0', search: '' })
			setPostList(list)
			setCursor(max_cursor)
			if (size > 5) {
				infiniteScrollInstance.current?.reset()
			}
			resolve(undefined)
		})
	}

	useDidHide(() => {
		// setShowPost(false)
	})

	const handlePostDetail = (postId: string) => () => {
		return () => {
			console.log("click post", postId)
			Taro.navigateTo({
				url: `/pages/post/index?id=${postId}`,
			})
		}
	}

	const handlePostVideo = async () => {
		try {
			const cb = await Taro.chooseVideo({
				sourceType: ['album', 'camera'],
				camera: 'back',
				// maxDuration: 60 * 10
			})
			const filePath = cb.tempFilePath
			const width = cb.width
			const height = cb.height
			const ext = getFileExt(filePath)
			const res = await FilesAPI.getPreSignedUrl({
				category: "video",
				ext: ext || ''
			})

			const wxfs = Taro.getFileSystemManager()
			wxfs.readFile({
				filePath: filePath,
				success: function (succ) {
					// setLoading(true)
					Taro.request({
						url: res.pre_signed_url,
						method: "PUT",
						data: succ.data,
						success: function (res2) {
							if (res2.statusCode === 200) {
								Taro.navigateTo({
									url: `/pages/editor/video?videoUrl=${res.exposed_url}&width=${width}&height=${height}`,
								});
							} else {
								Taro.showToast({ title: '视频上传失败' })
								console.error(res2);
							}
							// setLoading(false)
						}
					})
				}
			})
		} catch (err) {
			Taro.showToast({ title: '视频上传失败' })
			console.log(err)
		}
	}

	const handleSwitchStudent = () => {
		Toast.show("内测版本只支持添加一名学生")
	}

	return (
		<MainLayout>
			{student ? (
					<View>
						<Sticky>
							<View>
								<Cell renderTitle={(<View onClick={handleSwitchStudent}>
									<Space><Text className='font-bold'>{student?.name}</Text><Icon name='arrow' /></Space>
								</View>)} renderExtra={(
									<Button icon='plus' type='primary' size='small' onClick={handlePostVideo}></Button>
								)}
								/>
							</View>
						</Sticky>
						<View className='mt-2 bg-white rounded-md shadow-gray-600'>
							<Search placeholder='搜索关键字' value={search} onBlur={e => setSearch(e.detail)} onSearch={onRefresh} />
							<View>
								<PullToRefresh onRefresh={onRefresh}>
									<View className='mt-3'>
										{postList.map(item => (
												<View key={`homeList-${item.id}`} className='mt-1'>
													<Row>
														<Col span={4}>
															<Image src={item.author_avatar_url} radius={4} width={80} height={80}
																		 onClick={() => Toast.show('查看用户详情')}
																		 className='flex items-center justify-center'
															/>
														</Col>
														<Col span={20}>
															<Row className='mt-2'>
																<Col span={20}>
																	<View className='left-0'>
																		<Space>
																			<Text className='font-bold'>{item.author_display_name}</Text>
																			<Text>@{item.class_name}</Text>
																		</Space>
																	</View>
																</Col>
																<Col span={4}>
																	<Text className='right-0 text-blue-400' onClick={handlePostDetail(item.id)()}>详情</Text>
																</Col>
																<Col span={24} className='mt-2'>
																	{item.title ? (
																		<View>
																			<Cell title={item.title} renderLabel={(
																				<View>
																					<Ellipsis rows={4} defaultExpand hiddenAction>{item.content}</Ellipsis>
																				</View>
																			)}
																			/>
																		</View>

																	) : (
																		<Ellipsis rows={4} defaultExpand hiddenAction>{item.content}</Ellipsis>
																	)}
																</Col>
																{item.type == 1 ? (
																	<Col span={24} className='mt-2'>
																		<View>
																			<Video className='w-1/2' showFullscreenBtn autoPauseIfNavigate
																						 src={item.attachment_url}
																			/>
																		</View>
																	</Col>
																) : (<View></View>)}
																<Col span={24}>
																	<Text>发布于：{formatTimestamp(item.created_at)}</Text>
																</Col>
															</Row>
														</Col>
													</Row>
												</View>
											)
										)}
									</View>
									<InfiniteScroll loadMore={loadMore} ref={infiniteScrollInstance} />
								</PullToRefresh>
							</View>
						</View>
					</View>
				)
				:
				(
					<View>
						<Empty description='请添加学生或点击刷新' onClick={refreshStudents} />
					</View>
				)
			}
		</MainLayout>
	)
		;
}
