import Taro, {useRouter} from '@tarojs/taro'
import {Input, View} from "@tarojs/components"
import {Button, Dialog, Form, FormItem} from "@antmjs/vantui"
import {useState} from "react"
import ClassesAPI from "src/api/classes"


const Create = () => {
  const router = useRouter()
  const {params} = router;
  console.log(params)
  Taro.setNavigationBarTitle({title: `添加 ${params.studentName} 的课程`})

  const formIt = Form.useForm()
  const [formValues] = useState<{ name: string, studentId?: string }>({name: '', studentId: params.studentId})

  const handleSubmit = async () => {
    formIt.validateFields((errorMessage, fieldValues) => {

      console.log(errorMessage, fieldValues)

      if (errorMessage && errorMessage.length) {
        Dialog.alert({
          message: `errorMessage: ${JSON.stringify(errorMessage)}`,
          selector: '#form-dialog',
        })
        return console.info('errorMessage', errorMessage)
      } else {
        ClassesAPI.createClass({
          name: fieldValues["name"],
          student_id: params.studentId || '',
        }).then(() => {
          Taro.navigateBack({
            delta: 1,
            fail: () => Taro.redirectTo({url: '/pages/student/index'})
          })
        })
      }
    })
  }

  return (
    <View>
      <Form form={formIt} initialValues={formValues}>
        <FormItem label='课程名称' name='name' required trigger='onInput'
          validateTrigger='onBlur'
          valueFormat={(e) => e.detail.value}
        >

          <Input placeholder='请输入课程姓名' />
        </FormItem>
        <Button className='fixed w-full bottom-4' type='primary' onClick={handleSubmit}>提交</Button>
      </Form>
      <Dialog id='form-dialog' />
    </View>
  )
}

export default Create;
