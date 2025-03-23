import Taro, {useRouter} from "@tarojs/taro";
import {Editor, View} from "@tarojs/components"
import {useState} from "react"
import {Button, Col, Row, Space, Toast} from "@antmjs/vantui"

const Post = () => {
  const router = useRouter()
  const {params} = router;
  console.log(params)
  // const [postType, setPostType] = useState<number>(0)

  const [editorParams, setEditorParams] = useState({
    placeholder: '输入试试...'
  })

  // const [editorCtx, setEditorCtx] = useState(null)

  const editorReady = () => {
    Taro.createSelectorQuery().select('#editor').context((res) => {
      // setEditorCtx(res.context)
    }).exec()
  }

  // const handleAddAttachment = () => {
  //   setTypeSelectorOpened(true)
  // }


  const handleSaveDraftAndBack = () => {
    Toast.show({message: "草稿保存成功"})
  }

  const handlePublishToHome = () => {

  }

  const handlePublishToClass = () => {

  }

  return (
    <View>
      <View className='m-2 bg-white rounded-md'>
        <Editor id='editor' className='editor rounded-md' placeholder={editorParams.placeholder} onReady={editorReady} />
      </View>
      <View className='fixed bottom-0 left-0 right-0'>
        <Row>
          <Col span={6}>
            <View className='left-0'>
              <Button type='default' plain onClick={handleSaveDraftAndBack}>存草稿</Button>
            </View>
          </Col>
          <Col span={14} offset={4}>
            <View className='right-0'>
              <Space>
                <Button type='primary' onClick={handlePublishToHome}>发布到主页</Button>
                <Button type='primary' onClick={handlePublishToClass}>发布到课程</Button>
              </Space>
            </View>
          </Col>
        </Row>
      </View>
    </View>
  )
}

export default Post;
