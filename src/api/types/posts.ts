export interface CreatePostRequest {
	class_id: string
	student_id: string
	content: string
	attachment_url: string
	type: number
	attachment_ids: string[]
}

export interface CreatePostResult {
}

export interface HomeListRequest {
	max_cursor: string
	search: string
}

export interface HomeListResult {
	list: PostItem[]
	max_cursor: string
	limit: number
	size: number
}

export interface PostItem {
	id: string
	class_id: string
	class_name: string
	student_id: string
	student_name: string
	category_id: string
	title?: string
	content: string
	tags: string
	created_at: number
	attachment_url: string
	cover_image_url: string
	type: number
	author_id: string
	author_name: string
	author_display_name: string
	author_avatar_url: string
	attachments: AttachmentItem[]
}

export interface AttachmentItem {
	id: string
	type: number
	url: string
	snapshot_url: string
}

export interface PostDetail {
	post?: PostItem
	comments?: CommentItem[]
}

export interface CommentItem {

}
