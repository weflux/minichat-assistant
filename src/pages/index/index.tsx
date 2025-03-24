import {Text, View} from "@tarojs/components";
import {
  Col,
  Grid,
  GridItem,
  Image,
  InfiniteScroll,
  InfiniteScrollInstance,
  InfiniteScrollProps,
  IPullToRefreshProps,
  NoticeBar,
  Popup,
  PullToRefresh,
  Row,
  Search
} from "@antmjs/vantui";
import {useUserStore} from "src/stores/user-store";
import Taro, {useDidHide} from "@tarojs/taro"
import React, {useEffect, useRef, useState} from "react"
import "./index.less";
import FloatPostButton from "./post_button";

export interface ContentItem {
  key: string;
  author_id: string,
  author_name: string,
  author_avatar_url: string,
  content: string,
  attachments: string[],
  created_at: string,
}

export default function Index() {
  const user = useUserStore.use.user();
  const InfiniteScrollInstance = useRef<InfiniteScrollInstance>()


  const [showPost, setShowPost] = useState(false);

  useEffect(() => {
    if (!user?.id)
      Taro.navigateTo({
        url: "/pages/login/index",
      });
  }, [user?.id]);

  useDidHide(() => {
    setShowPost(false)
  })

  const [list] = useState<ContentItem[]>([
    {
      key: '1',
      author_id: '123',
      author_name: 'XX妈妈',
      author_avatar_url: "",
      content: '整个组件库是依赖开源项目 Vant Weapp\n' +
        '      的代码经过全量编译而来，所有样式文件及代码结构都与其保持高度一致，只是生命周期经过改造使其支持\n' +
        '      React，很大程度避免了重新造轮子带来的各种问题，同时保留了 Vant Weapp\n' +
        '      多年积累的经验 收到了一些反馈，这里说明一下吧。关于 demo',
      created_at: '2025-03-22',
      attachments: [],
    },
    {
      key: '2',
      author_id: '123',
      author_name: 'XX妈妈',
      author_avatar_url: "",
      content: '整个组件库是依赖开源项目 Vant Weapp\n' +
        '      的代码经过全量编译而来，所有样式文件及代码结构都与其保持高度一致，只是生命周期经过改造使其支持\n' +
        '      React，很大程度避免了重新造轮子带来的各种问题，同时保留了 Vant Weapp\n' +
        '      多年积累的经验 收到了一些反馈，这里说明一下吧。关于 demo',
      created_at: '2025-03-22',
      attachments: [],
    },
    {
      key: '3',
      author_id: '123',
      author_name: 'XX妈妈',
      author_avatar_url: "",
      content: '整个组件库是依赖开源项目 Vant Weapp\n' +
        '      的代码经过全量编译而来，所有样式文件及代码结构都与其保持高度一致，只是生命周期经过改造使其支持\n' +
        '      React，很大程度避免了重新造轮子带来的各种问题，同时保留了 Vant Weapp\n' +
        '      多年积累的经验 收到了一些反馈，这里说明一下吧。关于 demo',
      created_at: '2025-03-22',
      attachments: [],
    },
    {
      key: '4',
      author_id: '123',
      author_name: 'XX妈妈',
      author_avatar_url: "",
      content: '整个组件库是依赖开源项目 Vant Weapp\n' +
        '      的代码经过全量编译而来，所有样式文件及代码结构都与其保持高度一致，只是生命周期经过改造使其支持\n' +
        '      React，很大程度避免了重新造轮子带来的各种问题，同时保留了 Vant Weapp\n' +
        '      多年积累的经验 收到了一些反馈，这里说明一下吧。关于 demo',
      created_at: '2025-03-22',
      attachments: [],
    },
    {
      key: '5',
      author_id: '123',
      author_name: 'XX妈妈',
      author_avatar_url: "",
      content: '整个组件库是依赖开源项目 Vant Weapp\n' +
        '      的代码经过全量编译而来，所有样式文件及代码结构都与其保持高度一致，只是生命周期经过改造使其支持\n' +
        '      React，很大程度避免了重新造轮子带来的各种问题，同时保留了 Vant Weapp\n' +
        '      多年积累的经验 收到了一些反馈，这里说明一下吧。关于 demo',
      created_at: '2025-03-22',
      attachments: [],
    },
    {
      key: '6',
      author_id: '123',
      author_name: 'XX妈妈',
      author_avatar_url: "",
      content: '第二天打卡内容',
      created_at: '2025-03-22',
      attachments: [],
    }
  ]);

  const handleShowPost = () => {
    setShowPost(true);
  }
  const handlePost = (postType: number) => {
    return () => {
      Taro.navigateTo({
        url: `/pages/editor/index?postType=${postType}`,
      });
    }
  }

  const onRefresh: IPullToRefreshProps['onRefresh'] = () => {
    return new Promise(async (resolve) => {
      resolve(undefined)
    })
  }

  const loadMore: InfiniteScrollProps['loadMore'] = async () => {
    return new Promise(async (resolve) => {
      resolve('complete')
    })
  }

  return (
    <View className='bg-white h-full'>
      <Search placeholder='请输入搜过关键字' />
      <NoticeBar
        leftIcon='volume-o'
        text='在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。'
      />
      <View className='mt-2'>
        <PullToRefresh onRefresh={onRefresh}>
          <View>
            {list.map((item, index) => (
                <View key={`van-demo-goods-item-wrapper-infinite${index}`}>
                  <Row>
                    <Col span={4}>
                      <Image src={item.author_avatar_url} round width={100} height={100}
                        className='flex items-center justify-center'
                      />
                    </Col>
                    <Col span={20}>
                      <Row>
                        <Col span={24}>
                          <Text className='font-bold'>{item.author_name}</Text>
                        </Col>
                        <Col span={24}>
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
          <InfiniteScroll loadMore={loadMore} ref={InfiniteScrollInstance} />
        </PullToRefresh>
      </View>
      <Popup show={showPost} onClose={() => setShowPost(!showPost)} position='bottom'>
        <Grid columnNum='3'>
          <GridItem icon='photo-o' text='发想法' onClick={handlePost(1)} />
          <GridItem icon='photo-o' text='发文章' onClick={handlePost(2)} />
          <GridItem icon='photo-o' text='发打卡' onClick={handlePost(3)} />
        </Grid>
      </Popup>
      <FloatPostButton onClick={handleShowPost} />
    </View>
  );
}
