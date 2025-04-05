import { Input, View } from "@tarojs/components"
import { Button, Dialog, Form, FormItem } from "@antmjs/vantui"
import StudentsAPI from "src/api/students"
import Taro from "@tarojs/taro"
import { useState } from "react"

const Create = () => {

  const formIt = Form.useForm()
  const [formValues] = useState<{ name: string }>({ name: '' })

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
        StudentsAPI.createStudent({
          name: fieldValues["name"],
        }).then(() => {
          Taro.navigateBack({
            delta: 1,
            fail: () => Taro.redirectTo({ url: '/pages/student/index' })
          })
        })
      }
    })
  }

  return (
    <View>
      <Form form={formIt} initialValues={formValues}>
        <FormItem
          label='学生姓名'
          name='name'
          required
          trigger='onInput'
          validateTrigger='onBlur'
          // taro的input的onInput事件返回对应表单的最终值为e.detail.value
          valueFormat={e => e.detail.value}
        >
          <Input placeholder='请输入学生姓名' />
        </FormItem>
        <Button className='fixed w-full bottom-4' type='primary' onClick={handleSubmit}>提交</Button>
      </Form>
      <Dialog id='form-dialog' />

    </View>
  )
}

export default Create
