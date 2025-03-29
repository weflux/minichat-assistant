import {CreateClassRequest, CreateClassResult, GetClassesRequest, GetClassesResult} from "src/api/types/classes"
import request from "src/utils/request"


namespace ClassesAPI {
  export function getClasses(data: GetClassesRequest): Promise<GetClassesResult> {
    return request.post('/api/v1/students/classes/list', data)
  }

  export function createClass(data: CreateClassRequest): Promise<CreateClassResult> {
    return request.post('/api/v1/classes/create', data)
  }
}

export default ClassesAPI;
