export interface GetClassesRequest {

}

export interface GetClassesResult {
  list: ClassItem[]
}

export interface ClassItem {
  class_id: string
  class_code: string
  class_name: string
  category: number
  tags: string[]
  student_id: string
  student_name: string
}

export interface CreateClassRequest {
  name: string
  student_id: string
}

export interface CreateClassResult {

}
