import {UserInfo} from "src/api/types/auth"

export interface GetProfileRequest {
}

export interface GetProfileResult {
  students: number
  posts: number
  classes: number
  user: UserInfo
}
