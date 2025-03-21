import {GetTokenParams, GetTokenResponse} from "src/api/types/auth"
import request from "src/utils/request"

namespace AuthAPI {
  export function getToken(data: GetTokenParams): Promise<GetTokenResponse> {
    return request.post('/api/v1/token', data)
  }
}


export default AuthAPI
