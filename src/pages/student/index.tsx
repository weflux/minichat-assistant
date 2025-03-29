import {View} from "@tarojs/components"
import {StudentItem} from "src/api/types/students"
import {useState} from "react"
import StudentsAPI from "src/api/students"
import Taro, {useDidShow, useLoad} from "@tarojs/taro"
import {Button, Cell, CellGroup, Empty} from "@antmjs/vantui"

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

  const handleAddStudent = async () => {
    Taro.navigateTo({
      url: "/pages/student/create",
    })
  }

  const handleAddClass = (student: StudentItem) =>  {
    return () => {
      Taro.navigateTo({
        url: `/pages/class/create?studentId=${student.id}&studentName=${student.name}`,
      })
    }
  }

  return (
    <View>
      {(students.length > 0) ? (
        <CellGroup>
          {students.map((student ) => (
            <Cell key={student.id} title={student.name} renderRightIcon={<Button plain size='small' type='info' onClick={handleAddClass(student)}>添加课程</Button>} />
          ))}
        </CellGroup>
      ) : (
        <Empty description='暂无学生' />
      )}
      <View className='fixed bottom-4 w-full'>
        <Button type='primary' className='w-full' onClick={handleAddStudent}>添加学生</Button>
      </View>
    </View>
  )
}

export default List;
