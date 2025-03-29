import {Textarea, Video, View} from "@tarojs/components"
import Taro, {useLoad, useRouter} from "@tarojs/taro"
import {Button, Dialog, Divider, Form, FormItem, Picker} from "@antmjs/vantui"
import {useState} from "react"
import ClassesAPI from "src/api/classes"
import PostsAPI from "src/api/posts"

interface ClassSelectItem {
  text: string,
  id: string,
  disabled: boolean,
}

const Index = () => {
  const router = useRouter()
  const {params} = router;
  const videoUrl = params?.videoUrl || '';
  const [classList, setClassList] = useState<ClassSelectItem[]>([])
  useLoad(async () => {
    const data = await ClassesAPI.getClasses({})
    const list: ClassSelectItem[] = []
    data.list.forEach(item => {
      list.push({
        id: item.class_id,
        text: `${item.student_name} 的 ${item.class_name}`,
        disabled: false
      })
    })
    setClassList(list)
  })
  const formIt = Form.useForm()
  const [formValues] = useState<{ content: string, classId: string }>({content: '', classId: ''})
  const [content, setContent] = useState<string>('')

  const handlePost = async () => {

    formIt.validateFields((errorMessage, fieldValues) => {

      console.log(errorMessage, fieldValues)

      if (errorMessage && errorMessage.length) {
        Dialog.alert({
          message: `errorMessage: ${JSON.stringify(errorMessage)}`,
          selector: '#form-dialog',
        })
        return console.info('errorMessage', errorMessage)
      } else {
        PostsAPI.create({
          attachment_url: videoUrl,
          class_id: fieldValues['classId'],
          content: content,
          type: 1
        }).then(() => {
          Taro.navigateBack({
            delta: 1,
            fail: () => Taro.redirectTo({url: '/pages/index/index'})
          })
        })
      }
    })
  }

  return (
    <View>
      <Form form={formIt} initialValues={formValues}>
        <Textarea autoHeight name='conent' value={content} onInput={(e) => {
          setContent(e.detail.value)
        }}
        />
        <Video src={videoUrl} />
        <Divider />

        <FormItem
          name='classId'
          label='课程'
          valueFormat={(e) => e.detail}
          trigger='onInput'
          valueKey='value'
          controllFlexEnd
          required
        >
          <Picker idKey='id' mode='content' title='请选择' columns={classList} />
        </FormItem>
        <View className='fixed bottom-4 w-full'>
          <Button type='primary' className='w-full' onClick={handlePost}>确认发布</Button>
        </View>
      </Form>
    </View>


  )
}
export default Index
