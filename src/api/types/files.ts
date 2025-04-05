export interface GetPreSignedUrlRequest {
	ext: string
	category: string
}

export interface GetPreSignedUrlResult {
	exposed_url: string
	pre_signed_url: string
	file_path: string
}
