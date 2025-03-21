export interface GetTokenParams {
  grant_type: string
  authorization_code: string
}

export interface UserInfo {
  id: string
  name: string
  display_name: string
  gender: number
  phone: string
  avatar_url: string
}

export interface GetTokenResponse {
  token: string
  token_type: string
  expires_in: number
  expires_at: number
  refresh_token: string
  user: UserInfo
}
