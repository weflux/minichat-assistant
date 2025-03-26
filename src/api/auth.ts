import {GetTokenParams, GetTokenResponse, UpdateProfileRequest, UserInfo} from "src/api/types/auth"
import request from "src/utils/request"

namespace UsersAPI {
  export function getToken(data: GetTokenParams): Promise<GetTokenResponse> {
    return request.post('/api/v1/token', data)
  }

  export function uploadProfile(data: UpdateProfileRequest): Promise<UserInfo> {
    return request.post('/api/v1/users/update', data)
  }
}


export default UsersAPI
