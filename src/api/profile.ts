import {GetProfileRequest, GetProfileResult} from "src/api/types/profile"
import request from "src/utils/request"

namespace ProfileAPI {
  export function getProfile(data: GetProfileRequest): Promise<GetProfileResult> {
    return request.post('/api/v1/profile/get', data)
  }
}

export default ProfileAPI;
