export interface GetPreSignedUrlRequest {
  ext: string
  category: string
}

export interface GetPreSignedUrlResult {
  upload_url: string
}
