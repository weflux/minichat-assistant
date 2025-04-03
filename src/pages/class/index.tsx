import { View } from "@tarojs/components"
import { Cell, CellGroup, Empty } from "@antmjs/vantui"
import { useState } from "react"
import { useLoad } from "@tarojs/taro"
import ClassesAPI from "src/api/classes"
import MainLayout from "src/layout/main"

interface ClassInfo {
  classId: string
  classCode: string
  className: string
  category: number
}

// interface StudentInfo {}
interface StudentClassData {
  studentId: string
  studentName: string
  classes: Array<ClassInfo>
}

const List = () => {
  const [data, setData] = useState<StudentClassData[]>([])

  useLoad(async () => {
    const { list } = await ClassesAPI.getClasses({})
    const datamap: Map<string, StudentClassData> = new Map([]);
    list.forEach(v => {
      if (!datamap.has(v.student_id)) {
        datamap.set(v.student_id, {
          studentId: v.student_id,
          studentName: v.student_name,
          classes: [{
            classId: v.class_id,
            classCode: v.class_code,
            className: v.class_name,
            category: v.category
          }]
        })
      } else {
        datamap.get(v.student_id)?.classes.push({
          classId: v.class_id,
          classCode: v.class_code,
          className: v.class_name,
          category: v.category
        })
      }
    })
    const vdata: StudentClassData[] = [];
    datamap.forEach(v => {
      vdata.push(v)
    })
    setData(vdata)
  })
  return (
    <MainLayout>
      {(data.length > 0) ? (
        <View>
          {data.map(student => (
              <CellGroup key={student.studentId} title={student.studentName}>
                {student.classes.map(cls => (
                  <Cell key={cls.classId} title={cls.className} value={`ID ${cls.classCode}`} />
                ))}
              </CellGroup>
            )
          )}
        </View>
      ) : (
        <Empty description='我的课程' />
      )}
    </MainLayout>
  )
}

export default List;
