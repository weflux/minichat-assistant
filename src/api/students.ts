import { CreateStudentRequest, CreateStudentResult,  GetStudentsResult } from "src/api/types/students"
import request from "src/utils/request"

namespace StudentsAPI {
  export function getStudents(): Promise<GetStudentsResult> {
    return request.post('/api/v1/students/list', {})
  }

  export function createStudent(data: CreateStudentRequest): Promise<CreateStudentResult> {
    return request.post('/api/v1/students/create', data)
  }
}

export default StudentsAPI;
