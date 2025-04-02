import {CreateStudentRequest, CreateStudentResult, GetStudentsRequest, GetStudentsResult} from "src/api/types/students"
import request from "src/utils/request"

namespace StudentsAPI {
  export function getStudents(data: {}): Promise<GetStudentsResult> {
    return request.post('/api/v1/students/list', data)
  }

  export function createStudent(data: CreateStudentRequest): Promise<CreateStudentResult> {
    return request.post('/api/v1/students/create', data)
  }
}

export default StudentsAPI;
