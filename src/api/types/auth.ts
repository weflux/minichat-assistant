export interface GetTokenParams {
  grant_type: string
  authorization_code: string
}

export interface GetTokenResponse {
  token: string
}
