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
  list: PostItem[]
  max_cursor: string
}

export interface PostItem {
  id: string
  class_id: string
  category_id: string
  content: string
  tags: string
  created_at: number
  attachment_url: string
  type: number
}
