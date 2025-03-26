import {Button, View} from "@tarojs/components"
import {StudentItem} from "src/api/types/students"
import {useState} from "react"
import StudentsAPI from "src/api/students"
import Taro, {useDidShow, useLoad} from "@tarojs/taro"
import {Cell, CellGroup, Empty} from "@antmjs/vantui"

const List = () => {

  const [students, setStudents] = useState<StudentItem[]>([])

  useLoad(async () => {
    const {list} = await StudentsAPI.getStudents({})
    setStudents(list)
  })
  useDidShow(async () => {
    const {list} = await StudentsAPI.getStudents({})
    setStudents(list)
  })

  const handleAddStudent = async (e) => {
    Taro.navigateTo({
      url: "/pages/student/create",
    })
  }

  return (
    <View>
      {(students.length > 0) ? (
        <CellGroup>
          {students.map((student, index) => (
            <Cell key={student.id} title={student.name} />
          ))}
        </CellGroup>
      ):(
        <Empty description='暂无学生，请新增' />
      )}
      <View className='fixed bottom-4 left-0 right-0'>
        <Button type='primary' className='w-full' onClick={handleAddStudent}>新增学生</Button>
      </View>
    </View>
  )
}

export default List;
