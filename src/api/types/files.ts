export interface FilePrepareRequest {
	ext: string
	type: string
}

export interface FilePrepareResult {
	attachment_id: string
	exposed_url: string
	pre_signed_url: string
	file_path: string
}
