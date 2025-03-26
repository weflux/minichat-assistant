export interface GetStudentsRequest {
}

export interface StudentItem {
  id: string
  name: string
}

export interface GetStudentsResult {
  list: StudentItem[]
}


export interface CreateStudentRequest {
  name: string
}

export interface CreateStudentResult {
}
