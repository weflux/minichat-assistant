import {Text, Video, View} from "@tarojs/components";
import {
  Button,
  Col,
  Grid,
  GridItem,
  Image,
  InfiniteScroll,
  InfiniteScrollInstance,
  InfiniteScrollProps,
  IPullToRefreshProps,
  Popup,
  PullToRefresh,
  Row,
  Search,
  Sticky
} from "@antmjs/vantui";
import Taro, {useDidHide} from "@tarojs/taro"
import {useRef, useState} from "react"
import FilesAPI from "src/api/files"
import {PostDetail} from "src/api/types/posts"
import PostsAPI from "src/api/posts"
import MainLayout from "src/layout/main"

function getFileExt(filename: string): string | undefined {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop()! : undefined;
}

export default function Index() {

  // const router = useRouter()
  // const {params} = router;
  // const refresh = params.shouldRefresh === "true";
  // const setToken = useUserStore.use.setToken()
  // const user = useUserStore.use.user()
  // const setUser = useUserStore.use.setUser()
  const [loading, setLoading] = useState(false)

  const infiniteScrollInstance = useRef<InfiniteScrollInstance>()
  const [postList, setPostList] = useState<PostDetail[]>([])

  const [showPost, setShowPost] = useState(false);
  const [cursor, setCursor] = useState<string>('0')
  const [search, setSearch] = useState<string>('')

  const loadMore: InfiniteScrollProps['loadMore'] = async () => {
    console.log("loadMore")
    return new Promise(async (resolve) => {
      try {
        const {list, max_cursor, limit, size} = await PostsAPI.getHomeList({max_cursor: cursor, search: search})
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
    return new Promise(async (resolve) => {
      const {list, max_cursor, size} = await PostsAPI.getHomeList({max_cursor: '0', search: search})
      if (size > 0) {
        // const newList = postList.concat(list)
        setPostList(list)
        setCursor(max_cursor)
      } else {
        setCursor("0")
      }
      if (postList?.length || 0 > 1) infiniteScrollInstance.current?.reset()
      resolve(undefined)
    })
  }

  useDidHide(() => {
    setShowPost(false)
  })

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
          setLoading(true)
          Taro.request({
            url: res.upload_url,
            method: "PUT",
            data: succ.data,
            success: function (res2) {
              if (res2.statusCode === 200) {
                Taro.navigateTo({
                  url: `/pages/editor/video?videoUrl=${res.upload_url}&width=${width}&height=${height}`,
                });
              } else {
                Taro.showToast({title: '视频上传失败'})
                console.error(res2);
              }
              setLoading(false)
            }
          })
        }
      })
    } catch (err) {
      Taro.showToast({title: '视频上传失败'})
      console.log(err)
      setLoading(false)
    }
  }

  const handlePostAudio = () => {
    Taro.navigateTo({
      url: `/pages/editor/index`,
    });
  }

  const handlePostDoc = () => {
    Taro.navigateTo({
      url: `/pages/editor/index`,
    });
  }

  return (
    <MainLayout>
      <Sticky>
        <View>
          <Row className='bg-white w-full'>
            <Col span='19'>
              <Search placeholder='请输入搜过关键字' onBlur={(e) => setSearch(e.detail.value)} onSearch={onRefresh} />
            </Col>
            <Col span='5'>
              <View className='flex items-center'>
                <Button className='mt-3 mr-2' size='small' type='info' onClick={handlePostVideo} icon='add-o' loading={loading} />
              </View>
            </Col>
          </Row>
        </View>
      </Sticky>
      <View className='mt-2'>
        <PullToRefresh onRefresh={onRefresh}>
          <View>
            {postList.map((item) => (
                <View key={`homeList-${item.id}`}>
                  <Row>
                    <Col span={4}>
                      <Image src={item.author_avatar_url} round width={100} height={100}
                        className='flex items-center justify-center'
                      />
                    </Col>
                    <Col span={20}>
                      <Row>
                        <Col span={24}>
                          <Text className='font-bold'>{item.author_display_name}</Text>
                        </Col>
                        <Col span={24}>
                          {item.type == 1 ? (
                            <Video src={item.attachment_url} />
                          ) : (<View></View>)}
                          <Text>
                            {item.content}
                          </Text>
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
      <Popup show={showPost} onClose={() => setShowPost(!showPost)} position='bottom'>
        <Grid columnNum='3'>
          <GridItem icon='photo-o' text='发视频' onClick={handlePostVideo} />
          <GridItem icon='photo-o' text='发语音' onClick={handlePostAudio} />
          <GridItem icon='photo-o' text='发文章' onClick={handlePostDoc} />
        </Grid>
      </Popup>
      {/*<FloatPostButton onClick={handlePostVideo} />*/}
    </MainLayout>
  );
}
