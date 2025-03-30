export interface CreatePostRequest {
  class_id: string
  content: string
  attachment_url: string
  type: number
}

export interface CreatePostResult {
}

export interface HomeListRequest {
}

export interface HomeListResult {
  list: PostDetail[]
  max_cursor: string
  limit: number
  size: number
}

export interface PostDetail {
  id: string
  class_id: string
  class_name: string
  category_id: string
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
}
